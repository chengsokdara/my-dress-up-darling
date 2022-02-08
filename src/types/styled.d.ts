import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: IColor
    dark: boolean
    presets: IPreset
    radius: IRadius
    styling: IStyling
  }
}
