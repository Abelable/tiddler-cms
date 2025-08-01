import { useCallback, useMemo } from "react";
import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useLakeTrip } from "service/lakeTrip";

export const useLakeTripListSearchParams = () => {
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

export const useLakeTripListQueryKey = () => {
  const [params] = useLakeTripListSearchParams();
  return ["lake_trip_list", params];
};

export const useLakeTripModal = () => {
  const [{ lakeTripCreate }, setLakeTripModalOpen] = useUrlQueryParams([
    "lakeTripCreate",
  ]);
  const [{ editingLakeTripId }, setEditingLakeTripId] = useUrlQueryParams([
    "editingLakeTripId",
  ]);
  const setUrlParams = useSetUrlSearchParams();
  const { data: editingLakeTrip, isLoading } = useLakeTrip(
    Number(editingLakeTripId)
  );

  const open = useCallback(
    () => setLakeTripModalOpen({ lakeTripCreate: true }),
    [setLakeTripModalOpen]
  );
  const startEdit = useCallback(
    (id: number) => setEditingLakeTripId({ editingLakeTripId: `${id}` }),
    [setEditingLakeTripId]
  );
  const close = useCallback(
    () => setUrlParams({ lakeTripCreate: "", editingLakeTripId: "" }),
    [setUrlParams]
  );

  return {
    lakeTripModalOpen: lakeTripCreate === "true" || !!editingLakeTripId,
    editingLakeTripId,
    editingLakeTrip,
    isLoading,
    open,
    startEdit,
    close,
  };
};
