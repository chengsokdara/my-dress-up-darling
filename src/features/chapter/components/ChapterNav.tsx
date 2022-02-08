import { grey50, grey900 } from 'src/constants/colors'
import { EFontWeight } from 'src/constants/enums'
import { Button, RoundButton, Row, Text } from 'src/shared/components'
import styled from 'src/styled'

export interface IChapterNavProps {
  index?: number
  loading?: boolean
  position?: number
  onBack?: () => void
  onBottom?: () => void
  onNext?: () => void
  onPrevious?: () => void
  onTop?: () => void
}

export const ChapterNav = ({
  index,
  loading,
  position,
  onBack,
  onBottom,
  onNext,
  onPrevious,
  onTop,
}: IChapterNavProps) => {
  return (
    <Content>
      <RoundButton
        icon="chevron-left"
        iconColor={grey50}
        iconSize={32}
        onPress={onBack}
      />
      {onPrevious ? (
        <Button height={40} preset="primary" onPress={onPrevious}>
          Previous Chapter
        </Button>
      ) : onNext ? (
        <Button height={40} preset="primary" onPress={onNext}>
          Next Chapter
        </Button>
      ) : !loading ? (
        <Text color={grey50} size={15} weight={EFontWeight.Bold}>
          {`${index} / ${position}`}
        </Text>
      ) : null}
      {loading ? (
        <RoundButton
          icon="close"
          iconColor={grey50}
          iconSize={25}
          onPress={onBack}
        />
      ) : (
        <Row>
          <RoundButton
            icon="chevron-down"
            iconColor={grey50}
            iconSize={32}
            onPress={onBottom}
          />
          <RoundButton
            icon="chevron-up"
            iconColor={grey50}
            iconSize={32}
            onPress={onTop}
          />
        </Row>
      )}
    </Content>
  )
}

const Content = styled(Row)`
  align-items: center;
  background-color: ${grey900}77;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  bottom: 0;
  justify-content: space-between;
  left: 0;
  right: 0;
  padding: 0 10px;
  position: absolute;
`
