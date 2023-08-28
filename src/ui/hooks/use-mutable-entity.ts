/* eslint-disable new-cap */
import { useState } from 'react'

export type UseMutableEntityResult<T> = {
  state: T
  update: (instance: T) => void
}

export const getMutable = (obj: any) => {
  const _obj: any = {}

  for (const key of Object.keys(obj)) {
    if (typeof obj[key] === 'undefined' || obj[key] === null) {
      _obj[key] = obj[key]
      continue
    }

    if (Array.isArray(obj[key])) {
      _obj[key] = [...obj[key]].map(item => {
        if (typeof item === 'object') {
          return getMutable(item)
        }

        return item
      })
      continue
    }

    if (obj[key] instanceof Date) {
      _obj[key] = new Date(obj[key])
      continue
    }

    if (typeof obj[key] === 'object') {
      _obj[key] = { ...obj[key] }
      continue
    }

    _obj[key] = obj[key]
  }

  return _obj
}

export const useMutableEntity = <T>(target: any, initial: T | null = null): UseMutableEntityResult<T> => {
  const getInitial = () => {
    if (!initial) return null

    const instance = new target()

    Object.assign(instance, getMutable(initial))

    return instance
  }

  const [state, setState] = useState<any>(getInitial())

  const update = (old: any) => {
    const newInstance = new target()

    Object.assign(newInstance, getMutable(old))

    setState(newInstance)
  }

  return {
    state, update
  }
}

export const useMutableObject = <T>(initial: T | null = null): UseMutableEntityResult<T> => {
  const [state, setState] = useState<any>(initial)

  const update = (old: any) => {
    const newInstance = { ...old }
    setState(newInstance)
  }

  return {
    state, update
  }
}
/* all credits got to israel costa for showing me these hooks */
