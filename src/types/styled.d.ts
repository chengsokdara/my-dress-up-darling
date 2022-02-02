import 'styled-components'

interface IColor {
  primary: string
  background: string
  card: string
  text: string
  border: string
  notification: string
}

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: IColor
    dark: boolean
  }
}
