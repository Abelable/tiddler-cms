import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";

export const useProviderRestaurantListSearchParams = () => {
  const [params, setParams] = useUrlQueryParams(["status", "page", "limit"]);
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

export const useProviderRestaurantListQueryKey = () => {
  const [params] = useProviderRestaurantListSearchParams();
  return ["provider_restaurant_list", params];
};

export const useRejectModal = () => {
  const [{ rejectProviderRestaurantId }, setRejectProviderId] =
    useUrlQueryParams(["rejectProviderRestaurantId"]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    (id: number) =>
      setRejectProviderId({ rejectProviderRestaurantId: `${id}` }),
    [setRejectProviderId]
  );
  const close = useCallback(
    () => setUrlParams({ rejectProviderRestaurantId: "" }),
    [setUrlParams]
  );

  return {
    rejectModalOpen: !!rejectProviderRestaurantId,
    rejectProviderRestaurantId,
    open,
    close,
  };
};
