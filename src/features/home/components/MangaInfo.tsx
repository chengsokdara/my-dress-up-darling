import { Dimensions, Image } from 'react-native'
import { EFontWeight } from 'src/constants/enums'
import { Col, Row, Text } from 'src/shared/components'
import styled from 'src/styled'

interface IMangaData {
  names: string[]
  genres: string[]
  author: string
  published: string
  serialization: string
}

export interface IMangaInfoProps {
  data: IMangaData
}

const screenWidth = Dimensions.get('window').width

export const MangaInfo = ({ data }: IMangaInfoProps) => {
  return (
    <Row>
      <Cover source={require('src/assets/images/cover.jpeg')} />
      <InfoContent>
        <Text size={12} weight={EFontWeight.Bold}>
          Alternative Names
        </Text>
        <Text size={12}>{data.names.join(', ')}</Text>
        <Text size={12} weight={EFontWeight.Bold}>
          Genres
        </Text>
        <Text size={12}>{data.genres.join(', ')}</Text>
        <Text size={12} weight={EFontWeight.Bold}>
          Author
        </Text>
        <Text size={12}>{data.author}</Text>
        <Text size={12} weight={EFontWeight.Bold}>
          Published
        </Text>
        <Text size={12}>{data.published}</Text>
        <Text size={12} weight={EFontWeight.Bold}>
          Serialization
        </Text>
        <Text size={12}>{data.serialization}</Text>
      </InfoContent>
    </Row>
  )
}

const coverWidth = (screenWidth - 40) / 2

const Cover = styled(Image)`
  border-radius: 30px;
  width: ${coverWidth}px;
  height: ${(coverWidth / 1725) * 2475}px;
`

const InfoContent = styled(Col)`
  flex: 1;
  justify-content: center;
  padding: 0 10px;
`
