import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";

export const useProviderHotelListSearchParams = () => {
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

export const useProviderHotelListQueryKey = () => {
  const [params] = useProviderHotelListSearchParams();
  return ["provider_hotel_list", params];
};

export const useRejectModal = () => {
  const [{ rejectProviderHotelId }, setRejectProviderId] = useUrlQueryParams([
    "rejectProviderHotelId",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    (id: number) => setRejectProviderId({ rejectProviderHotelId: `${id}` }),
    [setRejectProviderId]
  );
  const close = useCallback(
    () => setUrlParams({ rejectProviderHotelId: "" }),
    [setUrlParams]
  );

  return {
    rejectModalOpen: !!rejectProviderHotelId,
    rejectProviderHotelId,
    open,
    close,
  };
};
