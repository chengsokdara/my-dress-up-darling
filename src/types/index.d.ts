type FlattenSimpleInterpolation =
  import('styled-components').FlattenSimpleInterpolation

interface IColor {
  primary: string
  background: string
  card: string
  text: string
  border: string
  notification: string
  textInfo: string
}

interface IMarginStylingProps {
  m?: string | number
  mx?: string | number
  my?: string | number
  mb?: string | number
  ml?: string | number
  mr?: string | number
  mt?: string | number
}

interface IPaddingStylingProps {
  p?: string | number
  px?: string | number
  py?: string | number
  pb?: string | number
  pl?: string | number
  pr?: string | number
  pt?: string | number
}

interface IPreset {
  primary: string
  negative: string
  neutral: string
  positive: string
}

interface IRadius {
  card: number
}

interface IStyling {
  borders: (color: string, width?: number) => FlattenSimpleInterpolation
  center: FlattenSimpleInterpolation
  margins: (props: IMarginStylingProps) => FlattenSimpleInterpolation
  paddings: (props: IPaddingStylingProps) => FlattenSimpleInterpolation
  shadows: (elevation?: number) => FlattenSimpleInterpolation
  textShadows: (elevation?: number) => FlattenSimpleInterpolation
}

interface IStylingProps {
  bgColor?: string
}
