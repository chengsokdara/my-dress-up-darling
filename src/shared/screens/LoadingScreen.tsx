import { Image as RNImage } from 'react-native'
import { EFontWeight } from 'src/constants/enums'
import { Col, SubTitle, Text, Title } from 'src/shared/components'
import styled, { css } from 'src/styled'

export const LoadingScreen = () => {
  return (
    <Content>
      <Title weight={EFontWeight.Bold}>My Dress-Up Darling</Title>
      <Image
        resizeMode="contain"
        source={require('src/assets/images/loading.png')}
      />
      <Text>Created by</Text>
      <SubTitle weight={EFontWeight.Bold}>Mr. Cheng Sokdara</SubTitle>
    </Content>
  )
}

const Content = styled(Col)`
  ${({ theme }) => css`
    ${theme.styling.center}
  `}
  flex: 1;
  padding: 20px;
`

const Image = styled(RNImage)`
  flex: 1;
`
