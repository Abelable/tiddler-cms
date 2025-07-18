import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";

export const useShopRestaurantListSearchParams = () => {
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

export const useShopRestaurantListQueryKey = () => {
  const [params] = useShopRestaurantListSearchParams();
  return ["shop_restaurant_list", params];
};

export const useRejectModal = () => {
  const [{ rejectShopRestaurantId }, setRejectProviderId] = useUrlQueryParams([
    "rejectShopRestaurantId",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    (id: number) => setRejectProviderId({ rejectShopRestaurantId: `${id}` }),
    [setRejectProviderId]
  );
  const close = useCallback(
    () => setUrlParams({ rejectShopRestaurantId: "" }),
    [setUrlParams]
  );

  return {
    rejectModalOpen: !!rejectShopRestaurantId,
    rejectShopRestaurantId,
    open,
    close,
  };
};
