import type { TextProps } from 'react-native'
import { Text as RNText } from 'react-native'
import { EFontName, EFontWeight } from 'src/constants/enums'
import styled, { css } from 'src/styled'

export interface ITextProps extends TextProps {
  align?:
    | 'center'
    | 'left'
    | 'start'
    | 'right'
    | 'end'
    | 'justify'
    | 'inherit'
    | 'initial'
    | 'unset'
  color?: string
  size?: number
  stretch?: boolean
  weight?: EFontWeight
}

export const Text = styled(RNText)<ITextProps & IPaddingStylingProps>`
  ${({
    align = 'left',
    color,
    size = 15,
    stretch,
    theme,
    weight = EFontWeight.Regular,
    ...rest
  }) => css`
    ${theme.styling.paddings(rest)}
    color: ${color ?? theme.colors.text};
    flex: ${stretch ? 1 : 'none'};
    font-family: ${`${EFontName.montserratAlternatives}-${weight}`};
    font-size: ${size}px;
    text-align: ${align};
  `};
  include-font-padding: false;
  text-align-vertical: center;
`

export const CenterText = styled(Text)`
  text-align: center;
`

export const SubTitle = styled(Text)<ITextProps>`
  ${({ size = 18, theme }) => css`
    color: ${theme.colors.text};
    font-size: ${size}px;
  `};
  padding: 0 20px 10px;
  text-align: center;
`

export const Title = styled(Text)<ITextProps>`
  ${({ color, size = 32, theme }) => css`
    color: ${color ?? theme.colors.primary};
    font-size: ${size}px;
  `};
  text-align: center;
`

export type { IExpandableTextProps } from './Text/ExpandableText'
export type { ILinkTextProps } from './Text/LinkText'
export { ExpandableText } from './Text/ExpandableText'
export { LinkText } from './Text/LinkText'
