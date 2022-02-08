import { View as RNView } from 'react-native'
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context'
import styled, { css } from 'src/styled'

export const Col = styled(RNView)<{ stretch?: boolean } & IPaddingStylingProps>`
  ${({ stretch, theme, ...rest }) => css`
  ${theme.styling.paddings(rest)}
  flex: ${stretch ? 1 : 'none'}};
`}
`

export const Row = styled(Col)`
  flex-direction: row;
`

export const Container = styled(RNSafeAreaView)`
  flex: 1;
`

export const Content = styled(Col)<{ padding?: number }>`
  ${({ padding }) => css`
    padding: ${padding}px;
  `}
  flex: 1;
`

export const Header = styled(Col)<IPaddingStylingProps>`
  ${({ theme, ...props }) => css`
    ${theme.styling.paddings(props)}
  `}
  align-items: center;
`

export const Center = styled(Col)`
  ${({ theme }) => css`
    ${theme.styling.center}
  `}
`
