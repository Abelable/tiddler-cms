import { useCallback, useMemo } from "react";
import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useNightTrip } from "service/nightTrip";

export const useNightTripListSearchParams = () => {
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

export const useNightTripListQueryKey = () => {
  const [params] = useNightTripListSearchParams();
  return ["night_trip_list", params];
};

export const useNightTripModal = () => {
  const [{ nightTripCreate }, setNightTripModalOpen] = useUrlQueryParams([
    "nightTripCreate",
  ]);
  const [{ editingNightTripId }, setEditingNightTripId] = useUrlQueryParams([
    "editingNightTripId",
  ]);
  const setUrlParams = useSetUrlSearchParams();
  const { data: editingNightTrip, isLoading } = useNightTrip(
    Number(editingNightTripId)
  );

  const open = useCallback(
    () => setNightTripModalOpen({ nightTripCreate: true }),
    [setNightTripModalOpen]
  );
  const startEdit = useCallback(
    (id: number) => setEditingNightTripId({ editingNightTripId: `${id}` }),
    [setEditingNightTripId]
  );
  const close = useCallback(
    () => setUrlParams({ nightTripCreate: "", editingNightTripId: "" }),
    [setUrlParams]
  );

  return {
    nightTripModalOpen: nightTripCreate === "true" || !!editingNightTripId,
    editingNightTripId,
    editingNightTrip,
    isLoading,
    open,
    startEdit,
    close,
  };
};
