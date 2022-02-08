import analytics from '@react-native-firebase/analytics'
import crashlytics from '@react-native-firebase/crashlytics'
import type { NavigationContainerRef } from '@react-navigation/native'
import { NavigationContainer } from '@react-navigation/native'
import { useCallback, useRef } from 'react'
import { Platform, StatusBar, useColorScheme } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { darkTheme, lightTheme } from 'src/constants/themes'
import { RootStack } from 'src/shared/Stack'
import { ThemeProvider } from 'src/styled'

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
      try {
        await analytics().logScreenView({
          screen_name: currentRouteName,
          screen_class: currentRouteName,
        })
      } catch (error) {
        crashlytics().recordError(error as Error)
      }
    }
    routeNameRef.current = currentRouteName
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <NavigationContainer
          ref={navigationRef}
          theme={theme}
          onReady={handleReady}
          onStateChange={handleStateChange}>
          <RootStack />
        </NavigationContainer>
        <StatusBar
          barStyle={`${colorScheme === 'dark' ? 'light' : 'dark'}-content`}
          backgroundColor="transparent"
        />
      </SafeAreaProvider>
    </ThemeProvider>
  )
}
