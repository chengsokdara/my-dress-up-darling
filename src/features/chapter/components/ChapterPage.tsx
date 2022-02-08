import {
  GestureResponderEvent,
  Image as RNImage,
  TouchableOpacity,
} from 'react-native'
import styled, { css } from 'src/styled'

export interface IChapterPageProps {
  data?: IPageData
  onPress?: (event: GestureResponderEvent) => void
}

export const ChapterPage = ({ data, onPress }: IChapterPageProps) => {
  return data ? (
    <TouchableOpacity onPress={onPress}>
      <Image
        height={data.height}
        source={{ uri: data.uri }}
        width={data.width}
      />
    </TouchableOpacity>
  ) : null
}

const Image = styled(RNImage)`
  ${({ height, width }) => css`
    height: ${height}px;
    width: ${width}px;
  `}
`
