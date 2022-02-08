/**
 * Button with presets, text only and disabled state
 *
 * Presets: primary, negative, neutral, positive
 */
import type { FC } from 'react'
import type { TouchableOpacityProps } from 'react-native'
import { TouchableOpacity } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { grey200, grey50, grey600, transparent } from 'src/constants/colors'
import { EFontWeight } from 'src/constants/enums'
import { Text } from 'src/shared/components/Text'
import styled, { css, useTheme } from 'src/styled'

export interface IButtonProps
  extends TouchableOpacityProps,
    IMarginStylingProps {
  bgColor?: string
  flex?: boolean
  height?: number
  icon?: string
  iconColor?: string
  iconSize?: number
  iconSpace?: number
  label?: string
  preset?: keyof IPreset
  shadow?: 1 | 2 | 3
  textColor?: string
  textSize?: number
  textWeight?: EFontWeight
  width?: number
}

export const Button: FC<IButtonProps> = ({
  bgColor,
  disabled,
  icon,
  iconColor,
  iconSize = 15,
  iconSpace = 5,
  label,
  preset,
  shadow,
  textColor,
  textSize = 15,
  textWeight = EFontWeight.Regular,
  children,
  ...rest
}) => {
  const theme = useTheme()

  let _bgColor: string = transparent,
    _iconColor: string = theme.colors.text,
    _textColor: string = theme.colors.text
  if (disabled) {
    _bgColor = grey200
    _iconColor = grey200
    _textColor = grey600
  } else if (bgColor) {
    _bgColor = bgColor
  } else if (iconColor) {
    _iconColor = iconColor
  } else if (textColor) {
    _iconColor = textColor
    _textColor = textColor
  } else if (preset !== undefined) {
    _bgColor = theme.presets[preset]
    _iconColor = grey50
    _textColor = grey50
  }

  let _margin: string | number = 0
  if (rest.m) {
    _margin = rest.m
  } else if (shadow) {
    _margin = shadow + 1
  }

  return (
    <Touchable
      {...rest}
      bgColor={_bgColor}
      disabled={disabled}
      m={_margin}
      preset={preset}
      shadow={shadow}>
      {icon ? (
        <Icon
          color={_iconColor}
          name={icon}
          size={iconSize}
          space={iconSpace}
        />
      ) : null}
      {typeof children === 'string' ? (
        <Label color={_textColor} size={textSize} weight={textWeight}>
          {label || children}
        </Label>
      ) : (
        children
      )}
    </Touchable>
  )
}

const Touchable = styled(TouchableOpacity)<IButtonProps>`
  ${({ bgColor, flex, height, preset, shadow, theme, width, ...rest }) => css`
    ${theme.styling.center}
    ${theme.styling.margins(rest)}
    ${theme.styling.shadows(shadow ? shadow : 0)}
    background-color: ${bgColor};
    border-radius: 10px;
    flex: ${flex ? 1 : 'none'};
    height: ${height ?? 60}px;
    padding: ${preset !== undefined ? 10 : 0}px;
    width: ${width ? `${width}px` : 'auto'};
  `}
  flex-direction: row;
`

const Icon = styled(MaterialCommunityIcons)<{ space?: number }>`
  ${({ space }) => css`
    margin-right: ${space ?? 0}px;
  `}
`

const Label = styled(Text)<{ color?: string; size?: number }>`
  ${({ color, size }) => css`
    color: ${color};
    font-size: ${size}px;
  `}
`

export { RoundButton } from './Button/RoundButton'
