import { useCallback, useMemo, useState } from 'react'
import ImageView from 'react-native-image-viewing'
import { grey50, grey900 } from 'src/constants/colors'
import { EFontWeight } from 'src/constants/enums'
import { Button, Col, RoundButton, Row, Text } from 'src/shared/components'
import styled from 'src/styled'

export interface IChapterViewerProps {
  data?: IPageData[]
  index?: number
  latest?: number
  position?: number
  visible?: boolean
  onChange?: (index: number) => void
  onClose: () => void
  onNext?: () => void
  onPrevious?: () => void
}

interface IChapterViewerComponentProps {
  imageIndex: number
}

export const ChapterViewer = ({
  data,
  index,
  latest,
  position = 0,
  visible = false,
  onChange,
  onClose,
  onNext,
  onPrevious,
}: IChapterViewerProps) => {
  const [pageIndex, setPageIndex] = useState<number>(position)

  const handlePageIndexChange = useCallback(
    (imageIndex: number) => {
      setPageIndex(imageIndex)
      onChange && onChange(imageIndex)
    },
    [data, pageIndex, position, visible],
  )

  const Footer = useMemo(
    () =>
      ({ imageIndex }: IChapterViewerComponentProps) => {
        return data ? (
          <Content>
            <RoundButton
              icon="close"
              iconColor={grey50}
              iconSize={25}
              onPress={onClose}
            />
            {pageIndex === 0 && index && index > 1 ? (
              <Button height={40} preset="primary" onPress={onPrevious}>
                {'Previous Chapter'}
              </Button>
            ) : pageIndex === data.length - 1 &&
              index &&
              latest &&
              index < latest ? (
              <Button height={40} preset="primary" onPress={onNext}>
                {'Next Chapter'}
              </Button>
            ) : null}
            <Text color={grey50} size={15} weight={EFontWeight.Bold}>
              {`${index} / ${imageIndex + 1}`}
            </Text>
          </Content>
        ) : null
      },
    [data, pageIndex, position, visible],
  )

  return data ? (
    <ImageView
      animationType="slide"
      images={data.map(item => ({ uri: item.uri }))}
      imageIndex={position}
      presentationStyle="overFullScreen"
      swipeToCloseEnabled={false}
      visible={visible}
      HeaderComponent={Header}
      FooterComponent={Footer}
      onImageIndexChange={handlePageIndexChange}
      onRequestClose={onClose}
    />
  ) : null
}

const Header = styled(Col)<{ imageIndex: number }>``

const Content = styled(Row)`
  align-items: center;
  background-color: ${grey900}77;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  justify-content: space-between;
  padding: 5px 30px 0 0;
`
