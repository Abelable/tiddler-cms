import { useCallback, useMemo } from "react";
import { useTopMedia } from "service/topMedia";
import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";

export const useTopMediaListSearchParams = () => {
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

export const useTopMediaListQueryKey = () => {
  const [params] = useTopMediaListSearchParams();
  return ["top_media_list", params];
};

export const useTopMediaModal = () => {
  const [{ topMediaCreate }, setTopMediaModalOpen] = useUrlQueryParams([
    "topMediaCreate",
  ]);
  const [{ editingTopMediaId }, setEditingTopMediaId] = useUrlQueryParams([
    "editingTopMediaId",
  ]);
  const setUrlParams = useSetUrlSearchParams();
  const { data: editingTopMedia, isLoading } = useTopMedia(
    Number(editingTopMediaId)
  );

  const open = useCallback(
    () => setTopMediaModalOpen({ topMediaCreate: true }),
    [setTopMediaModalOpen]
  );
  const startEdit = useCallback(
    (id: number) => setEditingTopMediaId({ editingTopMediaId: `${id}` }),
    [setEditingTopMediaId]
  );
  const close = useCallback(
    () => setUrlParams({ topMediaCreate: "", editingTopMediaId: "" }),
    [setUrlParams]
  );

  return {
    topMediaModalOpen: topMediaCreate === "true" || !!editingTopMediaId,
    editingTopMediaId,
    editingTopMedia,
    isLoading,
    open,
    startEdit,
    close,
  };
};
