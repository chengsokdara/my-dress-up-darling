import type { DefaultTheme } from 'styled-components'
import { useTheme } from 'styled-components'
import * as styledComponents from 'styled-components/native'

const {
  default: styled,
  css,
  ThemeProvider,
} = styledComponents as unknown as styledComponents.ReactNativeThemedStyledComponentsModule<DefaultTheme>

export { css, useTheme, DefaultTheme, ThemeProvider }
export default styled
