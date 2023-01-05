import { useUrlQueryParams } from "utils/url";
import { useMemo } from "react";

export const useMerchantOrdersSearchParams = () => {
  const [params, setParams] = useUrlQueryParams(["page", "limit"]);
  return [
    useMemo(
      () => ({
        page: Number(params.page) || 1,
        limit: Number(params.limit) || 10,
        ...params,
      }),
      [params]
    ),
    setParams,
  ] as const;
};

export const useMerchantOrdersQueryKey = () => {
  const [params] = useMerchantOrdersSearchParams();
  return ["merchant_orders", params];
};
