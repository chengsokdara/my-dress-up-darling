/**
 * Round Button with presets, icon only and disabled state
 *
 * Presets: primary, negative, neutral, positive
 */
import type { FC } from 'react'
import type { TouchableOpacityProps } from 'react-native'
import { TouchableOpacity } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { grey200, grey50, grey600, transparent } from 'src/constants/colors'
import styled, { css, useTheme } from 'src/styled'

export interface IRoundButtonProps
  extends TouchableOpacityProps,
    IMarginStylingProps {
  bgColor?: string
  icon?: string
  iconColor?: string
  iconSize?: number
  preset?: keyof IPreset
  shadow?: 1 | 2 | 3
  size?: number
}

export const RoundButton: FC<IRoundButtonProps> = ({
  bgColor,
  disabled,
  icon,
  iconColor,
  iconSize = 15,
  preset,
  shadow,
  children,
  ...rest
}) => {
  const theme = useTheme()

  let _bgColor: string = transparent,
    _iconColor: string = theme.colors.text
  if (bgColor) {
    _bgColor = bgColor
  }
  if (iconColor) {
    _iconColor = iconColor
  }
  if (preset !== undefined) {
    _bgColor = theme.presets[preset]
    _iconColor = grey50
  }
  if (disabled) {
    _bgColor = grey200
    _iconColor = grey600
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
      shadow={shadow}>
      {icon ? (
        <MaterialCommunityIcons
          color={_iconColor}
          name={icon}
          size={iconSize}
        />
      ) : typeof children === 'string' ? (
        <MaterialCommunityIcons
          color={_iconColor}
          name={children}
          size={iconSize}
        />
      ) : (
        children
      )}
    </Touchable>
  )
}

const Touchable = styled(TouchableOpacity)<IRoundButtonProps>`
  ${({ bgColor, shadow, theme, size, ...rest }) => css`
    ${theme.styling.center}
    ${theme.styling.margins(rest)}
     ${theme.styling.shadows(shadow ? shadow : 0)}
     background-color: ${bgColor};
    border-radius: ${size ?? 60 / 2}px;
    height: ${size ?? 60}px;
    width: ${size ?? 60}px;
  `}
  flex-direction: row;
`
