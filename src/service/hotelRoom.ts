import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import {
  useApproveConfig,
  useDeleteConfig,
  useRejectConfig,
} from "./use-optimistic-options";
import type {
  RoomListResult,
  RoomListSearchParams,
  RoomDetail,
} from "types/hotelRoom";

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

export const useApproveRoom = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("hotel/room/approve", {
        data: { id },
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
