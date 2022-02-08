import { TestIds as AdmobTestIds } from '@react-native-admob/admob'
import { EAdUnitName } from 'src/constants/enums'

// Set to true to hide ads
export const __PREVIEW__ = true

export const adUnitIds: Record<EAdUnitName, string> = {
  [EAdUnitName.chapterExit]: __DEV__
    ? AdmobTestIds.INTERSTITIAL
    : 'ca-app-pub-3409806059279439/6728156346',
  [EAdUnitName.chapterList]: __DEV__
    ? AdmobTestIds.BANNER
    : 'ca-app-pub-3409806059279439/1180316198',
  [EAdUnitName.pageList]: __DEV__
    ? AdmobTestIds.BANNER
    : 'ca-app-pub-3409806059279439/4756599125',
}
