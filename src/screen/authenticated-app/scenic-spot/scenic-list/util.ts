import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";
import { useScenic } from "service/scenic";

export const useScenicListSearchParams = () => {
  const [params, setParams] = useUrlQueryParams([
    "name",
    "categoryId",
    "status",
    "page",
    "limit",
  ]);
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

export const useScenicListQueryKey = () => {
  const [params] = useScenicListSearchParams();
  return ["scenic_list", params];
};

export const useScenicModal = () => {
  const [{ editingScenicId }, setEditingScenicId] = useUrlQueryParams([
    "editingScenicId",
  ]);
  const setUrlParams = useSetUrlSearchParams();
  const {
    data: editingScenic,
    isLoading,
    error,
  } = useScenic(Number(editingScenicId));

  const open = useCallback(
    (id: number) => setEditingScenicId({ editingScenicId: `${id}` }),
    [setEditingScenicId]
  );
  const close = useCallback(
    () => setUrlParams({ scenicCreate: "", editingScenicId: "" }),
    [setUrlParams]
  );

  return {
    scenicModalOpen: !!editingScenicId,
    editingScenicId,
    editingScenic,
    isLoading,
    error,
    open,
    close,
  };
};

export const useRejectModal = () => {
  const [{ rejectScenicId }, setRejectScenicId] = useUrlQueryParams([
    "rejectScenicId",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    (id: number) => setRejectScenicId({ rejectScenicId: `${id}` }),
    [setRejectScenicId]
  );
  const close = useCallback(
    () => setUrlParams({ rejectScenicId: "" }),
    [setUrlParams]
  );

  return {
    rejectModalOpen: !!rejectScenicId,
    rejectScenicId,
    open,
    close,
  };
};
