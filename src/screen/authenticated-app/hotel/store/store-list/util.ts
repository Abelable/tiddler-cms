import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";
import { useHotel } from "service/hotel";

export const useHotelListSearchParams = () => {
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

export const useHotelListQueryKey = () => {
  const [params] = useHotelListSearchParams();
  return ["hotel_list", params];
};

export const useHotelModal = () => {
  const [{ hotelCreate }, setAdminModalOpen] = useUrlQueryParams([
    "hotelCreate",
  ]);
  const [{ editingHotelId }, setEditingHotelId] = useUrlQueryParams([
    "editingHotelId",
  ]);
  const setUrlParams = useSetUrlSearchParams();
  const {
    data: editingHotel,
    isLoading,
    error,
  } = useHotel(Number(editingHotelId));

  const open = useCallback(
    () => setAdminModalOpen({ hotelCreate: true }),
    [setAdminModalOpen]
  );
  const startEdit = useCallback(
    (id: number) => setEditingHotelId({ editingHotelId: `${id}` }),
    [setEditingHotelId]
  );
  const close = useCallback(
    () => setUrlParams({ hotelCreate: "", editingHotelId: "" }),
    [setUrlParams]
  );

  return {
    hotelModalOpen: hotelCreate === "true" || !!editingHotelId,
    editingHotelId,
    editingHotel,
    isLoading,
    error,
    open,
    startEdit,
    close,
  };
};
