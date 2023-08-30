import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";
import { cleanObject } from "utils/index";

import type { Option } from "types/common";
import type {
  HotelRoomType,
  HotelRoomTypeListResult,
  HotelRoomTypeListSearchParams,
} from "types/hotelRoomType";

export const useHotelRoomTypeList = (
  params: Partial<HotelRoomTypeListSearchParams>
) => {
  const client = useHttp();
  return useQuery<HotelRoomTypeListResult>(
    ["hotel_room_type_list", params],
    () => client("hotel/room_type/list", { data: params, method: "POST" })
  );
};

export const useHotelRoomType = (id: number) => {
  const client = useHttp();
  return useQuery<Partial<HotelRoomType>>(
    ["hotel_room_type", { id }],
    () => client(`hotel/room_type/detail`, { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useAddHotelRoomType = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<HotelRoomType>) =>
      client("hotel/room_type/add", {
        data: cleanObject(params),
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditHotelRoomType = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<HotelRoomType>) =>
      client("hotel/room_type/edit", {
        data: cleanObject(params),
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteHotelRoomType = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("hotel/room_type/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useHotelRoomTypeOptions = (hotelId: number) => {
  const client = useHttp();
  return useQuery<Option[]>(
    ["hotel_room_type_options", { hotelId }],
    () => client("hotel/room_type/options", { data: { hotelId } }),
    {
      enabled: !!hotelId,
    }
  );
};
