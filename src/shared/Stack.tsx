import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useEffect, useRef, useState } from 'react'
import { FeatureStack } from 'src/features/Stack'
import { LoadingScreen } from 'src/shared/screens/LoadingScreen'

const Stack = createNativeStackNavigator<TRootStackParamList>()

export const RootStack = () => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [loading])

  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'none',
        headerShown: false,
      }}>
      {!loading ? (
        <Stack.Group>
          <Stack.Screen name="FeatureStack" component={FeatureStack} />
        </Stack.Group>
      ) : (
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  )
}
