import { useCallback, useMemo } from "react";
import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useStarTrip } from "service/starTrip";

export const useStarTripListSearchParams = () => {
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

export const useStarTripListQueryKey = () => {
  const [params] = useStarTripListSearchParams();
  return ["star_trip_list", params];
};

export const useStarTripModal = () => {
  const [{ starTripCreate }, setStarTripModalOpen] = useUrlQueryParams([
    "starTripCreate",
  ]);
  const [{ editingStarTripId }, setEditingStarTripId] = useUrlQueryParams([
    "editingStarTripId",
  ]);
  const setUrlParams = useSetUrlSearchParams();
  const { data: editingStarTrip, isLoading } = useStarTrip(
    Number(editingStarTripId)
  );

  const open = useCallback(
    () => setStarTripModalOpen({ starTripCreate: true }),
    [setStarTripModalOpen]
  );
  const startEdit = useCallback(
    (id: number) => setEditingStarTripId({ editingStarTripId: `${id}` }),
    [setEditingStarTripId]
  );
  const close = useCallback(
    () => setUrlParams({ starTripCreate: "", editingStarTripId: "" }),
    [setUrlParams]
  );

  return {
    starTripModalOpen: starTripCreate === "true" || !!editingStarTripId,
    editingStarTripId,
    editingStarTrip,
    isLoading,
    open,
    startEdit,
    close,
  };
};
