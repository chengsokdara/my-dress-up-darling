/**
 * Written by Mr. Cheng Sokdara
 * https://chengsokdara.github.io
 */

import type { Dispatch, SetStateAction } from 'react'
import { useState as useReactState } from 'react'

export function useState<T>(
  initialState: T,
): [T, Dispatch<SetStateAction<Partial<T>>>] {
  const [state, _setState] = useReactState<T>(initialState)
  const setState = (newState: Partial<T> | ((oldState: Partial<T>) => void)) =>
    _setState({
      ...state,
      ...newState,
    })
  return [state, setState]
}

export default useState
