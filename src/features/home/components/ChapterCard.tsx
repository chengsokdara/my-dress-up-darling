import { GestureResponderEvent, TouchableHighlight } from 'react-native'
import { EFontWeight } from 'src/constants/enums'
import { Col, Text } from 'src/shared/components'
import styled, { css, useTheme } from 'src/styled'

export interface IChapterCardProps {
  data: IChapterData
  episode: number
  onPress?: (event: GestureResponderEvent) => void
}

export const ChapterCard = ({ data, episode, onPress }: IChapterCardProps) => {
  const theme = useTheme()

  return (
    <Touchable underlayColor={theme.colors.primary} onPress={onPress}>
      <Content>
        <Col>
          <Text color={theme.colors.textInfo} weight={EFontWeight.Bold}>
            {data.name}
          </Text>
          {episode ? (
            <Text color={theme.colors.textInfo} size={12}>
              {`Episode ${episode}`}
            </Text>
          ) : null}
        </Col>
        <TextPage color={theme.colors.textInfo}>{data.pages}</TextPage>
      </Content>
    </Touchable>
  )
}

const Touchable = styled(TouchableHighlight)`
  ${({ theme }) => css`
    border-radius: ${theme.radius.card}px;
  `}
  height: 60px;
  margin-bottom: 3px;
`

const Content = styled(Col)`
  ${({ theme }) => css`
    ${theme.styling.shadows(1)}
    background-color: ${theme.colors.card};
    border-radius: ${theme.radius.card}px;
  `}
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 20px;
`

const TextPage = styled(Text)`
  ${({ theme }) => css`
    background-color: ${theme.colors.textInfo};
    color: ${theme.colors.card};
  `}
  border-radius: 20px;
  height: 40px;
  text-align: center;
  width: 40px;
`
