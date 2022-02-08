import { black, grey900 } from 'src/constants/colors'
import { css } from 'src/styled'

const borders = (color: string, width: number = 0) => css`
  border-color: ${color};
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-width: ${width}px;
  border-top-width: 0;
`

const center = css`
  align-items: center;
  justify-content: center;
`

const margins = ({ m, mb, ml, mr, mt, mx, my }: IMarginStylingProps) => css`
  margin: ${typeof m === 'string' ? m : typeof m === 'number' ? `${m}px` : 0};
  margin-bottom: ${typeof mb === 'string'
    ? mb
    : typeof mb === 'number'
    ? `${mb}px`
    : typeof my === 'string'
    ? my
    : typeof my === 'number'
    ? `${my}px`
    : m
    ? `${m}px`
    : 0};
  margin-left: ${typeof ml === 'string'
    ? ml
    : typeof ml === 'number'
    ? `${ml}px`
    : typeof mx === 'string'
    ? mx
    : typeof mx === 'number'
    ? `${mx}px`
    : m
    ? `${m}px`
    : 0};
  margin-right: ${typeof mr === 'string'
    ? mr
    : typeof mr === 'number'
    ? `${mr}px`
    : typeof mx === 'string'
    ? mx
    : typeof mx === 'number'
    ? `${mx}px`
    : m
    ? `${m}px`
    : 0};
  margin-top: ${typeof mt === 'string'
    ? mt
    : typeof mt === 'number'
    ? `${mt}px`
    : typeof my === 'string'
    ? my
    : typeof my === 'number'
    ? `${my}px`
    : m
    ? `${m}px`
    : 0};
`

const paddings = ({ p, pb, pl, pr, pt, px, py }: IPaddingStylingProps) => css`
  padding: ${typeof p === 'string' ? p : typeof p === 'number' ? `${p}px` : 0};
  padding-bottom: ${typeof pb === 'string'
    ? pb
    : typeof pb === 'number'
    ? `${pb}px`
    : typeof py === 'string'
    ? py
    : typeof py === 'number'
    ? `${py}px`
    : p
    ? `${p}px`
    : 0};
  padding-left: ${typeof pl === 'string'
    ? pl
    : typeof pl === 'number'
    ? `${pl}px`
    : typeof px === 'string'
    ? px
    : typeof px === 'number'
    ? `${px}px`
    : p
    ? `${p}px`
    : 0};
  padding-right: ${typeof pr === 'string'
    ? pr
    : typeof pr === 'number'
    ? `${pr}px`
    : typeof px === 'string'
    ? px
    : typeof px === 'number'
    ? `${px}px`
    : p
    ? `${p}px`
    : 0};
  padding-top: ${typeof pt === 'string'
    ? pt
    : typeof pt === 'number'
    ? `${pt}px`
    : typeof py === 'string'
    ? py
    : typeof py === 'number'
    ? `${py}px`
    : p
    ? `${p}px`
    : 0};
`

const shadows = (elevation: number = 2) => css`
  ${elevation === 1
    ? 'shadow-opacity: 0.18; shadow-radius: 1.0px;'
    : elevation === 2
    ? 'shadow-opacity: 0.2; shadow-radius: 1.41px;'
    : elevation === 3
    ? 'shadow-opacity: 0.22; shadow-radius: 2.22px;'
    : 'shadow-opacity: 0; shadow-radius: 0;'};
  shadow-color: ${black};
  shadow-offset: 0 1px;
  elevation: ${elevation};
`

const textShadows = (elevation: number = 2) => css`
  text-shadow-color: ${grey900}77;
  text-shadow-offset: 0px 1px;
  text-shadow-radius: ${elevation === 1
    ? '1.0'
    : elevation === 2
    ? '1.42'
    : elevation === 3
    ? '2.22'
    : '0'}px;
`

export const styling: IStyling = {
  borders,
  center,
  margins,
  paddings,
  shadows,
  textShadows,
}
