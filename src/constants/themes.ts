import {
  grey100,
  grey200,
  grey300,
  grey700,
  grey800,
  grey900,
} from 'src/constants/colors'
import { styling } from 'src/shared/utils/styling'
import type { DefaultTheme } from 'styled-components'

const primary = 'tomato'

const darkTheme: DefaultTheme = {
  dark: false,
  colors: {
    primary,
    background: 'black',
    card: grey900,
    text: 'white',
    border: grey800,
    notification: 'white',
    textInfo: grey300,
  },
  presets: {
    primary,
    negative: 'crimson',
    neutral: 'gray',
    positive: 'royalblue',
  },
  radius: {
    card: 20,
  },
  styling,
}

const lightTheme: DefaultTheme = {
  dark: false,
  colors: {
    primary,
    background: 'white',
    card: grey100,
    text: 'black',
    border: grey200,
    notification: 'black',
    textInfo: grey700,
  },
  presets: {
    primary,
    negative: 'crimson',
    neutral: 'gray',
    positive: 'royalblue',
  },
  radius: {
    card: 20,
  },
  styling,
}

export { darkTheme, lightTheme }
