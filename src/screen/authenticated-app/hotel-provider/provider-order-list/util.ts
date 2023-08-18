import { useUrlQueryParams } from "utils/url";
import { useMemo } from "react";

export const useProviderOrdersSearchParams = () => {
  const [params, setParams] = useUrlQueryParams(["page", "limit"]);
  return [
    useMemo(
      () => ({
        page: Number(params.page) || 1,
        limit: Number(params.limit) || 10,
      }),
      [params]
    ),
    setParams,
  ] as const;
};

export const useProviderOrdersQueryKey = () => {
  const [params] = useProviderOrdersSearchParams();
  return ["hotel_provider_orders", params];
};
