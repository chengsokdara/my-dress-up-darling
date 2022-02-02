import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { VolumeScreen } from './volume/screen/VolumeScreen'

const Stack = createNativeStackNavigator<TFeatureStackParamList>()

export const FeatureStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="VolumeScreen" component={VolumeScreen} />
    </Stack.Navigator>
  )
}
