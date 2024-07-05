import { useMemo } from "react";
import { iocContainer } from "../../ioc";
export const useDeps = <DepType>(depName: string): DepType => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const dep = useMemo(() => iocContainer.get<DepType>(depName), []);

  return dep;
};
