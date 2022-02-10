import { useInterstitialAd } from '@react-native-admob/admob'
import crashlytics from '@react-native-firebase/crashlytics'
import remoteConfig from '@react-native-firebase/remote-config'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { ListRenderItem, ViewToken } from 'react-native'
import { Dimensions, FlatList, Image as RNImage, StatusBar } from 'react-native'
import { grey900, white } from 'src/constants/colors'
import { adUnitIds, __PREVIEW__ } from 'src/constants/configs'
import { EAdUnitName, ERemoteConfigKey } from 'src/constants/enums'
import {
  ChapterNav,
  ChapterPage,
  ChapterViewer,
} from 'src/features/chapter/components'
import { AdmobBanner, Container, List } from 'src/shared/components'
import { zeroPad } from 'src/shared/utils/string'

const screenWidth = Dimensions.get('window').width

type TChapterScreenProps = NativeStackScreenProps<
  TFeatureStackParamList,
  'ChapterScreen'
>

export const ChapterScreen = ({ route, navigation }: TChapterScreenProps) => {
  const { baseUrls, latestChapter }: IRemoteData = JSON.parse(
    remoteConfig().getValue(ERemoteConfigKey.data).asString(),
  )
  const {
    adDismissed,
    // adLoadError,
    adLoaded,
    // adPresentError,
    adPresented,
    show,
  } = useInterstitialAd(adUnitIds[EAdUnitName.chapterExit], {
    loadOnMounted: !__PREVIEW__,
  })
  const dataLength = useRef<number>(0)
  const listRef = useRef<FlatList>(null)
  const mounted = useRef<boolean>(true)
  const viewableItemsChangedRef = useRef(
    ({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
      const firstIndex = viewableItems.some(vi => vi?.index === 0)
      const lastIndex =
        viewableItems[viewableItems.length - 1]?.index ===
        dataLength.current + 1
      if (firstIndex) {
        setScrollIndex(1)
      } else if (lastIndex) {
        setScrollIndex(dataLength.current)
      } else if (
        viewableItems[0]?.item.type === 'image' &&
        viewableItems[0]?.index
      ) {
        setScrollIndex(viewableItems[0]?.index)
      }
    },
  )
  const [data, setData] = useState<IPageData[]>()
  const [loading, setLoading] = useState<boolean>(true)
  const [position, setPosition] = useState<number>(0)
  const [scrollIndex, setScrollIndex] = useState<number>(0)
  const [userAction, setUserAction] = useState<'close' | 'next' | 'previous'>()
  const [visible, setVisible] = useState<boolean>(false)

  // console.info({
  //   adDismissed,
  //   adLoadError,
  //   adLoaded,
  //   adPresentError,
  //   adPresented,
  // })

  const handleCloseChapter = useCallback(() => {
    navigation.goBack()
  }, [])

  // const handleCloseChapter = useCallback(() => {
  //   if (__PREVIEW__ || adLoadError || adPresentError) {
  //     navigation.goBack()
  //     return true
  //   }

  //   if (adLoaded && !adPresented) {
  //     setUserAction('close')
  //     show()
  //     return true
  //   }
  // }, [adLoadError, adLoaded, adPresentError, adPresented])

  const handleIndexChange = useCallback(index => {
    if (index > 0) {
      listRef.current?.scrollToIndex({
        animated: false,
        index,
      })
    }
  }, [])

  const handleNextChapter = useCallback(() => {
    if (adLoaded && !adPresented) {
      setUserAction('next')
      show()
      return
    }
    if (route.params?.index) {
      navigation.replace('ChapterScreen', { index: route.params.index + 1 })
    }
  }, [adLoaded, adPresented])

  const handlePreviousChapter = useCallback(() => {
    if (adLoaded && !adPresented) {
      setUserAction('previous')
      show()
      return
    }
    if (route.params?.index && route.params.index > 1) {
      navigation.replace('ChapterScreen', { index: route.params.index - 1 })
    }
  }, [adLoaded, adPresented])

  const renderItem: ListRenderItem<IPageData> = useMemo(
    () =>
      ({ index, item }) => {
        return item.type === 'image' ? (
          <ChapterPage
            data={item}
            onPress={() => {
              setPosition(index)
              setVisible(true)
            }}
          />
        ) : item.type === 'ad' ? (
          <AdmobBanner bgColor={white} name={EAdUnitName.pageList} type="big" />
        ) : null
      },
    [],
  )

  const fetchPages = useCallback(async () => {
    const pages: IPageData[] = []
    let counter = 1,
      isError = false
    while (!isError && mounted.current === true) {
      try {
        const page = await new Promise<IPageData>((resolve, reject) => {
          if (route.params?.index) {
            const baseUrl = baseUrls[route.params.index - 1]
            const places = baseUrl.substring(
              baseUrl.indexOf('{'),
              baseUrl.indexOf('}') + 1,
            )
            const uri = baseUrl.replace(
              places,
              zeroPad(counter, places.length - 2),
            )
            console.info({ uri })
            RNImage.getSize(
              uri,
              (width, height) => {
                resolve({
                  height: height * (screenWidth / width),
                  type: 'image',
                  uid: uri,
                  uri,
                  width: screenWidth,
                })
              },
              error => {
                reject(error)
              },
            )
          } else {
            reject('no chapter index provided!')
          }
          console.info({ counter })
        })
        pages.push(page)
        counter++
      } catch (error) {
        if (counter > 10) {
          crashlytics().recordError(error as Error)
          isError = true
        } else {
          counter++
        }
      }
    }
    if (mounted.current === true) {
      dataLength.current = pages.length
      // Push two ads at the start and end of the list
      if (pages.length > 0) {
        pages.splice(1, 0, { type: 'ad', uid: 'chapter-start-admob-banner-ad' })
        pages.splice(pages.length - 1, 0, {
          type: 'ad',
          uid: 'chapter-end-admob-banner-ad',
        })
      }
      setData(pages)
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPages()
    return () => {
      mounted.current = false
    }
  }, [])

  useEffect(() => {
    if (adDismissed) {
      switch (userAction) {
        case 'close':
          navigation.goBack()
          break
        case 'next':
          handleNextChapter()
          break
        case 'previous':
          handlePreviousChapter()
          break
        default:
      }
    }
  }, [adDismissed, userAction])

  // useFocusEffect(
  //   useCallback(() => {
  //     BackHandler.addEventListener('hardwareBackPress', handleCloseChapter)
  //     return () => {
  //       BackHandler.removeEventListener('hardwareBackPress', handleCloseChapter)
  //     }
  //   }, [adLoadError, adLoaded, adPresentError, adPresented]),
  // )

  return (
    <Container edges={['bottom']}>
      <StatusBar
        backgroundColor={`${grey900}77`}
        barStyle="light-content"
        translucent
      />
      <List
        ref={listRef}
        data={data}
        progressViewOffset={StatusBar.currentHeight}
        refreshing={loading}
        renderItem={renderItem}
        ItemSeparatorComponent={null}
        onRefresh={() => fetchPages()}
        onViewableItemsChanged={viewableItemsChangedRef.current}
      />
      <ChapterNav
        index={route.params?.index}
        loading={loading}
        position={scrollIndex}
        onBack={handleCloseChapter}
        onBottom={() => listRef.current?.scrollToEnd({ animated: true })}
        onNext={
          scrollIndex === dataLength.current &&
          route.params &&
          route.params.index < latestChapter
            ? handleNextChapter
            : undefined
        }
        onPrevious={
          scrollIndex === 1 && route.params && route.params.index > 1
            ? handlePreviousChapter
            : undefined
        }
        onTop={() =>
          listRef.current?.scrollToOffset({ animated: true, offset: 0 })
        }
      />
      {data ? (
        <ChapterViewer
          data={data}
          index={route.params?.index}
          latest={latestChapter}
          position={position}
          visible={visible}
          onChange={handleIndexChange}
          onClose={() => setVisible(false)}
          onNext={handleNextChapter}
          onPrevious={handlePreviousChapter}
        />
      ) : null}
    </Container>
  )
}
