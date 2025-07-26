import { useCallback, useMemo } from "react";
import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useHotScenic } from "service/hotScenic";

export const useHotScenicListSearchParams = () => {
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

export const useHotScenicListQueryKey = () => {
  const [params] = useHotScenicListSearchParams();
  return ["hot_scenic_list", params];
};

export const useHotScenicModal = () => {
  const [{ hotScenicCreate }, setHotScenicModalOpen] = useUrlQueryParams([
    "hotScenicCreate",
  ]);
  const [{ editingHotScenicId }, setEditingHotScenicId] = useUrlQueryParams([
    "editingHotScenicId",
  ]);
  const setUrlParams = useSetUrlSearchParams();
  const { data: editingHotScenic, isLoading } = useHotScenic(
    Number(editingHotScenicId)
  );

  const open = useCallback(
    () => setHotScenicModalOpen({ hotScenicCreate: true }),
    [setHotScenicModalOpen]
  );
  const startEdit = useCallback(
    (id: number) => setEditingHotScenicId({ editingHotScenicId: `${id}` }),
    [setEditingHotScenicId]
  );
  const close = useCallback(
    () => setUrlParams({ hotScenicCreate: "", editingHotScenicId: "" }),
    [setUrlParams]
  );

  return {
    hotScenicModalOpen: hotScenicCreate === "true" || !!editingHotScenicId,
    editingHotScenicId,
    editingHotScenic,
    isLoading,
    open,
    startEdit,
    close,
  };
};
