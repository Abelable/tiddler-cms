import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";

export const useShopHotelListSearchParams = () => {
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

export const useShopHotelListQueryKey = () => {
  const [params] = useShopHotelListSearchParams();
  return ["shop_hotel_list", params];
};

export const useRejectModal = () => {
  const [{ rejectShopHotelId }, setRejectShopId] = useUrlQueryParams([
    "rejectShopHotelId",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    (id: number) => setRejectShopId({ rejectShopHotelId: `${id}` }),
    [setRejectShopId]
  );
  const close = useCallback(
    () => setUrlParams({ rejectShopHotelId: "" }),
    [setUrlParams]
  );

  return {
    rejectModalOpen: !!rejectShopHotelId,
    rejectShopHotelId,
    open,
    close,
  };
};
