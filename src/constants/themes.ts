import type { DefaultTheme } from 'styled-components'

const darkTheme: DefaultTheme = {
  dark: false,
  colors: {
    primary: 'white',
    background: 'black',
    card: 'gray',
    text: 'white',
    border: 'white',
    notification: 'white',
  },
}

const lightTheme: DefaultTheme = {
  dark: false,
  colors: {
    primary: 'black',
    background: 'white',
    card: 'gray',
    text: 'black',
    border: 'black',
    notification: 'black',
  },
}

export { darkTheme, lightTheme }
