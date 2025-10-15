import { useCallback, useMemo } from "react";
import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useLakeHomestay } from "service/lakeHomestay";

export const useLakeHomestayListSearchParams = () => {
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

export const useLakeHomestayListQueryKey = () => {
  const [params] = useLakeHomestayListSearchParams();
  return ["lake_homestay_list", params];
};

export const useLakeHomestayModal = () => {
  const [{ lakeHomestayCreate }, setLakeHomestayModalOpen] = useUrlQueryParams([
    "lakeHomestayCreate",
  ]);
  const [{ editingLakeHomestayId }, setEditingLakeHomestayId] =
    useUrlQueryParams(["editingLakeHomestayId"]);
  const setUrlParams = useSetUrlSearchParams();
  const { data: editingLakeHomestay, isLoading } = useLakeHomestay(
    Number(editingLakeHomestayId)
  );

  const open = useCallback(
    () => setLakeHomestayModalOpen({ lakeHomestayCreate: true }),
    [setLakeHomestayModalOpen]
  );
  const startEdit = useCallback(
    (id: number) =>
      setEditingLakeHomestayId({ editingLakeHomestayId: `${id}` }),
    [setEditingLakeHomestayId]
  );
  const close = useCallback(
    () => setUrlParams({ lakeHomestayCreate: "", editingLakeHomestayId: "" }),
    [setUrlParams]
  );

  return {
    lakeHomestayModalOpen:
      lakeHomestayCreate === "true" || !!editingLakeHomestayId,
    editingLakeHomestayId,
    editingLakeHomestay,
    isLoading,
    open,
    startEdit,
    close,
  };
};
