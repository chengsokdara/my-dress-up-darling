import { Navigation } from 'src/shared/Navigation'
import { useConfig } from 'src/shared/hooks/useConfig'

export const App = () => {
  useConfig()

  return <Navigation />
}
