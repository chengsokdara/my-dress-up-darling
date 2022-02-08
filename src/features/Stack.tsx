import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ChapterScreen } from './chapter/screens/ChapterScreen'
import { HomeScreen } from './home/screens/HomeScreen'

const Stack = createNativeStackNavigator<TFeatureStackParamList>()

export const FeatureStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ChapterScreen" component={ChapterScreen} />
    </Stack.Navigator>
  )
}
