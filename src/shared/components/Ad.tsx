import type { BannerAdProps } from '@react-native-admob/admob'
import { BannerAd, BannerAdSize } from '@react-native-admob/admob'
import type { Ref } from 'react'
import { adUnitIds, __PREVIEW__ } from 'src/constants/configs'
import { EAdUnitName } from 'src/constants/enums'
import { Center } from 'src/shared/components/Layout'
import styled, { css } from 'src/styled'

interface IAdProps {
  bgColor?: string
  mb?: number
  mt?: number
  name: EAdUnitName
  ref?: Ref<BannerAd>
  type?: 'small' | 'big'
}

export const AdmobBanner = ({
  ref,
  bgColor,
  mb,
  mt,
  name,
  type = 'small',
  ...rest
}: IAdProps & Omit<BannerAdProps, 'size' | 'unitId'>) => {
  return !__PREVIEW__ ? (
    <Content {...{ bgColor, mb, mt, type }}>
      <BannerAd
        {...rest}
        ref={ref}
        key="admob-banner-ad"
        size={
          type === 'big'
            ? BannerAdSize.MEDIUM_RECTANGLE
            : BannerAdSize.ADAPTIVE_BANNER
        }
        unitId={adUnitIds[name]}
        onAdFailedToLoad={error => console.error(error)}
      />
    </Content>
  ) : null
}

const Content = styled(Center)<Omit<IAdProps, 'name'>>`
  ${({ bgColor, mb, mt, type }) => css`
    background-color: ${bgColor ?? 'transparent'};
    height: ${type === 'big' ? '250px' : 'auto'};
    margin-bottom: ${mb ? mb : 0}px;
    margin-top: ${mt ? mt : 0}px;
  `}
`

export default AdmobBanner
