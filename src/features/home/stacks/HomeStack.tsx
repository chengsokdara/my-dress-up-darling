import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeScreen } from 'src/features/home/screens/HomeScreen'

const Stack = createNativeStackNavigator<THomeStackParamList>()

export const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  )
}
