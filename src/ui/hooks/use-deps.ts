import { useMemo } from 'react'
import { iocContainer } from '../../ioc'
export const useDeps = <DepType, >(depName: string): DepType => {
  const dep = useMemo(() => iocContainer.get<DepType>(depName), [])

  return dep
}
