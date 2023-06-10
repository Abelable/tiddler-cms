import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";

export const useProviderScenicListSearchParams = () => {
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

export const useProviderScenicListQueryKey = () => {
  const [params] = useProviderScenicListSearchParams();
  return ["provider_scenic_list", params];
};

export const useRejectModal = () => {
  const [{ rejectProviderScenicId }, setRejectProviderId] = useUrlQueryParams([
    "rejectProviderScenicId",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    (id: number) => setRejectProviderId({ rejectProviderScenicId: `${id}` }),
    [setRejectProviderId]
  );
  const close = useCallback(
    () => setUrlParams({ rejectProviderScenicId: "" }),
    [setUrlParams]
  );

  return {
    rejectModalOpen: !!rejectProviderScenicId,
    rejectProviderScenicId,
    open,
    close,
  };
};
