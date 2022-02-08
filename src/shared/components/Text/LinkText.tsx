import type { FC } from 'react'
import { Linking } from 'react-native'
import type { ITextProps } from 'src/shared/components/Text'
import { Text } from 'src/shared/components/Text'
import styled, { css } from 'src/styled'

export interface ILinkTextProps extends ITextProps {
  url: string
}

export const LinkText: FC<ILinkTextProps> = ({
  size = 14,
  url,
  children,
  ...rest
}: ILinkTextProps) => {
  return (
    <Container onPress={() => Linking.openURL(url)}>
      <Label {...rest} size={size}>
        {children ?? url}
      </Label>
    </Container>
  )
}

const Container = styled.TouchableOpacity`
  padding: 2px 0;
`

const Label = styled(Text)`
  ${({ theme }) => css`
    color: ${theme.presets.positive};
  `}
  text-decoration: underline;
`
