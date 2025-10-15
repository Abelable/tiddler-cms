import { useCallback, useMemo } from "react";
import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useLakeCycle } from "service/lakeCycle";

export const useLakeCycleListSearchParams = () => {
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

export const useLakeCycleListQueryKey = () => {
  const [params] = useLakeCycleListSearchParams();
  return ["lake_cycle_list", params];
};

export const useLakeCycleModal = () => {
  const [{ lakeCycleCreate }, setLakeCycleModalOpen] = useUrlQueryParams([
    "lakeCycleCreate",
  ]);
  const [{ editingLakeCycleId }, setEditingLakeCycleId] = useUrlQueryParams([
    "editingLakeCycleId",
  ]);
  const setUrlParams = useSetUrlSearchParams();
  const { data: editingLakeCycle, isLoading } = useLakeCycle(
    Number(editingLakeCycleId)
  );

  const open = useCallback(
    () => setLakeCycleModalOpen({ lakeCycleCreate: true }),
    [setLakeCycleModalOpen]
  );
  const startEdit = useCallback(
    (id: number) => setEditingLakeCycleId({ editingLakeCycleId: `${id}` }),
    [setEditingLakeCycleId]
  );
  const close = useCallback(
    () => setUrlParams({ lakeCycleCreate: "", editingLakeCycleId: "" }),
    [setUrlParams]
  );

  return {
    lakeCycleModalOpen: lakeCycleCreate === "true" || !!editingLakeCycleId,
    editingLakeCycleId,
    editingLakeCycle,
    isLoading,
    open,
    startEdit,
    close,
  };
};
