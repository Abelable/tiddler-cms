import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";

export const useShopScenicListSearchParams = () => {
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

export const useShopScenicListQueryKey = () => {
  const [params] = useShopScenicListSearchParams();
  return ["provider_scenic_list", params];
};

export const useRejectModal = () => {
  const [{ rejectShopScenicId }, setRejectProviderId] = useUrlQueryParams([
    "rejectShopScenicId",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    (id: number) => setRejectProviderId({ rejectShopScenicId: `${id}` }),
    [setRejectProviderId]
  );
  const close = useCallback(
    () => setUrlParams({ rejectShopScenicId: "" }),
    [setUrlParams]
  );

  return {
    rejectModalOpen: !!rejectShopScenicId,
    rejectShopScenicId,
    open,
    close,
  };
};
