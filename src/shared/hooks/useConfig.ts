import crashlytics from '@react-native-firebase/crashlytics'
import remoteConfig from '@react-native-firebase/remote-config'
import { useEffect } from 'react'
import { ERemoteConfigKey } from 'src/constants/enums'
import defaultDataJson from 'src/assets/data/defaultData.json'

export const useConfig = () => {
  useEffect(() => {
    remoteConfig().setConfigSettings({
      minimumFetchIntervalMillis: 180000, // 3 minutes
    })
    remoteConfig()
      .setDefaults({
        [ERemoteConfigKey.data]: JSON.stringify(defaultDataJson),
      })
      .then(() => {
        remoteConfig()
          .fetchAndActivate()
          .catch(error => {
            console.error(error)
            crashlytics().recordError(
              error,
              'remoteConfig().fetchAndActivate@useConfig',
            )
          })
      })
      .catch(error => {
        console.error(error)
        crashlytics().recordError(error, 'remoteConfig().setDefaults@useConfig')
      })
  }, [])
}
