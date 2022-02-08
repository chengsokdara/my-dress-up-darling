import type { DefaultSectionT } from 'react-native'
import { EFontWeight } from 'src/constants/enums'
import { Col, ExpandableText, Text } from 'src/shared/components'
import styled, { css } from 'src/styled'

export interface IVolumeCardProps {
  data: DefaultSectionT
}

export const VolumeCard = ({ data }: IVolumeCardProps) => {
  return data.data.length > 0 ? (
    <Content>
      <Label weight={EFontWeight.Bold}>{data.title}</Label>
      {data.synopsis ? (
        <ExpandableText line={3}>{data.synopsis}</ExpandableText>
      ) : null}
    </Content>
  ) : null
}

const Content = styled(Col)`
  ${({ theme }) => css`
    background-color: ${theme.colors.background};
    border-bottom-left-radius: ${theme.radius.card}px;
    border-bottom-right-radius: ${theme.radius.card}px;
  `}
  padding: 15px 10px 10px;
  margin: 0 0 10px;
`

const Label = styled(Text)`
  text-align: center;
`
