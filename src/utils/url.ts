import { useMemo, useState } from "react";
import {
  URLSearchParamsInit,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { cleanObject, subset } from "utils";

export const useUrlQueryParams = <K extends string>(keys: K[]) => {
  const [searchParams] = useSearchParams();
  const setSearchParams = useSetUrlSearchParams();
  const [stateKeys] = useState(keys);

  return [
    useMemo(
      () =>
        subset(Object.fromEntries(searchParams), stateKeys) as {
          [key in string]: string;
        },
      [searchParams, stateKeys]
    ),
    (params: Partial<{ [key in K]: unknown }>) => setSearchParams(params),
  ] as const;
};

export const useSetUrlSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  return (params: { [key in string]: unknown }) => {
    const o = cleanObject({
      ...Object.fromEntries(searchParams),
      ...params,
    }) as URLSearchParamsInit;
    return setSearchParams(o);
  };
};

export const useRouteType = () => {
  const units = useLocation().pathname.split("/");
  const defaultOpenKey = units[1];
  const selectedKey = units[units.length - 1];
  return { defaultOpenKey, selectedKey };
};
