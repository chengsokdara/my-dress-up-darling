import { useEffect, useState } from 'react'
import type { ImageProps } from 'react-native'
import { Dimensions, Image as RNImage } from 'react-native'

const screenWidth = Dimensions.get('window').width

interface IImageProps extends Omit<ImageProps, 'source'> {
  uri: string
  width?: number
}

export const Image = (props: IImageProps) => {
  const [style, setStyle] = useState({ width: 0, height: 0 })
  useEffect(() => {
    RNImage.getSize(props.uri, (width, height) => {
      if (props.width) {
        setStyle({
          width: props.width,
          height: height * (props.width / width),
        })
      } else {
        setStyle({
          width: screenWidth,
          height: height * (screenWidth / width),
        })
      }
    })
  }, [])

  return <RNImage source={{ uri: props.uri }} style={[style, props.style]} />
}
