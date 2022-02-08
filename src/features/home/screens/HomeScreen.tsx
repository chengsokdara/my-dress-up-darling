import remoteConfig from '@react-native-firebase/remote-config'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { version } from 'package.json'
import { useMemo, useState } from 'react'
import type { SectionListData, SectionListRenderItem } from 'react-native'
import { EAdUnitName, EFontWeight, ERemoteConfigKey } from 'src/constants/enums'
import { ChapterCard } from 'src/features/home/components'
import {
  AdmobBanner,
  Center,
  Container,
  Header,
  LinkText,
  SectionList,
  SubTitle,
  Text,
  Title,
} from 'src/shared/components'
import { generateChapters } from 'src/shared/utils/generator'
import styled, { useTheme } from 'src/styled'
import { MangaInfo } from '../components/MangaInfo'
import { VolumeCard } from '../components/VolumeCard'

type IHomeScreenProps = NativeStackScreenProps<TFeatureStackParamList>

export const HomeScreen = ({ navigation }: IHomeScreenProps) => {
  const remoteData: IRemoteData = JSON.parse(
    remoteConfig().getValue(ERemoteConfigKey.data).asString(),
  )
  const [data] = useState<IChapterData[]>(
    generateChapters(remoteData.latestChapter, remoteData.chapters),
  )
  const theme = useTheme()

  const sections: ISectionData[] = remoteData.volumes
    .map((v, i) => {
      const index = i + 1
      const start = v[0] - 1
      const end = v[1]
      const chapters: IChapterData[] = []

      for (let c = start; c < end; c++) {
        chapters.unshift(data[c])
      }
      return {
        synopsis: remoteData.synopses[i],
        title: `Volume ${index}`,
        data: chapters,
      }
    })
    .reverse()

  const renderItem: SectionListRenderItem<IChapterData> = useMemo(
    () =>
      ({ item }) => {
        return (
          <ChapterCard
            data={item}
            episode={remoteData.animes[item.index - 1]}
            onPress={() =>
              navigation.navigate('ChapterScreen', { index: item.index })
            }
          />
        )
      },
    [],
  )

  const renderSection: (info: {
    section: SectionListData<IChapterData>
  }) => React.ReactElement | null = useMemo(
    () => info => {
      return <VolumeCard data={info.section} />
    },
    [],
  )

  const ListHeader = useMemo(() => {
    return (
      <Center>
        <MangaInfo data={remoteData} />
        <AdmobBanner mt={10} name={EAdUnitName.chapterList} type="big" />
      </Center>
    )
  }, [])

  const ListFooter = useMemo(() => {
    return (
      <Center pt={10}>
        <AdmobBanner mb={5} name={EAdUnitName.chapterList} type="big" />
        <LinkText url="https://chengsokdara.github.io">Website</LinkText>
        <LinkText url="https://play.google.com/store/apps/developer?id=Cheng+Sokdara">
          More Apps
        </LinkText>
        <LinkText url="https://www.termsfeed.com/live/dabc8ed2-afa9-4432-a2ca-73bcca1914e8">
          Privacy Policy
        </LinkText>
        <Text
          color={theme.colors.textInfo}
          pt={5}>{`Version ${version.substring(
          0,
          version.indexOf('-'),
        )} Build ${version.substring(version.indexOf('-') + 1)}`}</Text>
      </Center>
    )
  }, [])

  return (
    <Container edges={['bottom']}>
      <Header>
        <Title pt={10} size={25} weight={EFontWeight.Bold}>
          My Dress-Up Darling
        </Title>
        <Text size={12}>Developed by</Text>
        <SubTitle weight={EFontWeight.Bold}>Mr. Cheng Sokdara</SubTitle>
      </Header>
      <ChapterList
        sections={sections}
        stickySectionHeadersEnabled
        renderItem={renderItem}
        renderSectionHeader={renderSection}
        ListHeaderComponent={ListHeader}
        ListFooterComponent={ListFooter}
      />
    </Container>
  )
}

const ChapterList = styled(SectionList)`
  padding: 0 20px 20px;
`
