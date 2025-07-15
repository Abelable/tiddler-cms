import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import {
  useApproveConfig,
  useDeleteConfig,
  useEditConfig,
  useRejectConfig,
} from "./use-optimistic-options";
import type {
  RoomListResult,
  RoomListSearchParams,
  RoomDetail,
  Room,
} from "types/hotelRoom";
import { cleanObject } from "utils";

export const useRoomList = (params: Partial<RoomListSearchParams>) => {
  const client = useHttp();
  return useQuery<RoomListResult>(["hotel_room_list", params], () =>
    client("hotel/room/list", { data: params, method: "POST" })
  );
};

export const useRoom = (id: number) => {
  const client = useHttp();
  return useQuery<Partial<RoomDetail>>(
    ["hotel_room", { id }],
    () => client(`hotel/room/detail`, { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useEditRoomCommission = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Room>) =>
      client("hotel/room/edit_commission", {
        data: cleanObject(params),
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useApproveRoom = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Room>) =>
      client("hotel/room/approve", {
        data: cleanObject(params),
        method: "POST",
      }),
    useApproveConfig(queryKey)
  );
};

export const useRejectRoom = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (data: { id: number; failureReason: string }) =>
      client("hotel/room/reject", {
        data,
        method: "POST",
      }),
    useRejectConfig(queryKey)
  );
};

export const useDeleteRoom = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("hotel/room/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};
