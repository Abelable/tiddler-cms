import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";
import { useScenic } from "service/scenic";

export const useScenicListSearchParams = () => {
  const [params, setParams] = useUrlQueryParams([
    "name",
    "categoryId",
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
  const [{ scenicCreate }, setAdminModalOpen] = useUrlQueryParams([
    "scenicCreate",
  ]);
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
    () => setAdminModalOpen({ scenicCreate: true }),
    [setAdminModalOpen]
  );
  const startEdit = useCallback(
    (id: number) => setEditingScenicId({ editingScenicId: `${id}` }),
    [setEditingScenicId]
  );
  const close = useCallback(
    () => setUrlParams({ scenicCreate: "", editingScenicId: "" }),
    [setUrlParams]
  );

  return {
    scenicModalOpen: scenicCreate === "true" || !!editingScenicId,
    editingScenicId,
    editingScenic,
    isLoading,
    error,
    open,
    startEdit,
    close,
  };
};
