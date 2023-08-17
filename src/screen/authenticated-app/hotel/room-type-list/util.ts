import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";
import { useHotelRoomType } from "service/hotelRoomType";

export const useHotelRoomTypeListSearchParams = () => {
  const [params, setParams] = useUrlQueryParams(["hotelId", "page", "limit"]);
  return [
    useMemo(
      () => ({
        page: Number(params.page) || 1,
        limit: Number(params.limit) || 10,
        hotelId: Number(params.hotelId) || undefined,
      }),
      [params]
    ),
    setParams,
  ] as const;
};

export const useHotelRoomTypeListQueryKey = () => {
  const [params] = useHotelRoomTypeListSearchParams();
  return ["hotel_room_type_list", params];
};

export const useHotelRoomTypeModal = () => {
  const [{ hotelRoomTypeCreate }, setHotelRoomTypeModalOpen] =
    useUrlQueryParams(["hotelRoomTypeCreate"]);
  const [{ editingHotelRoomTypeId }, setEditingHotelRoomTypeId] =
    useUrlQueryParams(["editingHotelRoomTypeId"]);
  const setUrlParams = useSetUrlSearchParams();
  const { data: editingHotelRoomType, isLoading } = useHotelRoomType(
    Number(editingHotelRoomTypeId)
  );

  const open = useCallback(
    () => setHotelRoomTypeModalOpen({ hotelRoomTypeCreate: true }),
    [setHotelRoomTypeModalOpen]
  );
  const startEdit = useCallback(
    (id: number) =>
      setEditingHotelRoomTypeId({ editingHotelRoomTypeId: `${id}` }),
    [setEditingHotelRoomTypeId]
  );
  const close = useCallback(
    () => setUrlParams({ hotelRoomTypeCreate: "", editingHotelRoomTypeId: "" }),
    [setUrlParams]
  );

  return {
    hotelRoomTypeModalOpen:
      hotelRoomTypeCreate === "true" || !!editingHotelRoomTypeId,
    editingHotelRoomTypeId,
    editingHotelRoomType,
    isLoading,
    open,
    startEdit,
    close,
  };
};
