import type { NavigationContainerRef } from '@react-navigation/native'
import { NavigationContainer } from '@react-navigation/native'
import { useCallback, useRef } from 'react'
import { Platform, StatusBar, useColorScheme } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { darkTheme, lightTheme } from 'src/constants/themes'
import { SafeArea } from 'src/shared/components/Layout'
import { ThemeProvider } from 'src/shared/styled'
import { RootStack } from './stacks/RootStack'

export const Navigation = () => {
  const navigationRef =
    useRef<NavigationContainerRef<TRootStackParamList>>(null)
  const routeNameRef = useRef<string>()
  const colorScheme = useColorScheme()
  const theme =
    Platform.select({
      native: colorScheme === 'dark' ? darkTheme : lightTheme,
      web: lightTheme,
    }) ?? lightTheme

  const handleReady = useCallback(() => {
    routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name
  }, [])

  const handleStateChange = useCallback(async () => {
    const previousRouteName = routeNameRef.current
    const currentRouteName = navigationRef.current?.getCurrentRoute()?.name
    if (previousRouteName !== currentRouteName) {
      console.info('log screen', {
        screen_name: currentRouteName,
        screen_class: currentRouteName,
      })
    }
    routeNameRef.current = currentRouteName
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <SafeArea edges={['top']}>
          <NavigationContainer
            ref={navigationRef}
            // linking={linkingConfiguration}
            theme={theme}
            onReady={handleReady}
            onStateChange={handleStateChange}>
            <RootStack />
          </NavigationContainer>
          <StatusBar
            barStyle={`${colorScheme === 'dark' ? 'light' : 'dark'}-content`}
            backgroundColor="transparent"
          />
        </SafeArea>
      </SafeAreaProvider>
    </ThemeProvider>
  )
}
