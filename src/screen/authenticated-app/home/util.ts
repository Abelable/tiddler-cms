import { useUrlQueryParams } from "utils/url";
import { useMemo } from "react";

export const useHomeSearchParams = () => {
  const [params, setParams] = useUrlQueryParams([
    "start_created_at",
    "end_created_at",
    "agent_id",
    "goods_id",
  ]);
  return [
    useMemo(() => {
      return {
        ...params,
      };
    }, [params]),
    setParams,
  ] as const;
};

export const useHomeQueryKey = () => {
  const [params] = useHomeSearchParams();
  return ["home_records", params];
};
