import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";
import { cleanObject } from "utils/index";
import type {
  Hotel,
  HotelListResult,
  HotelListSearchParams,
  HotelDetail,
  HotelOption,
} from "types/hotel";

export const useHotelList = (params: Partial<HotelListSearchParams>) => {
  const client = useHttp();
  return useQuery<HotelListResult>(["hotel_list", params], () =>
    client("hotel/list", { data: params, method: "POST" })
  );
};

export const useHotel = (id: number) => {
  const client = useHttp();
  return useQuery<Partial<HotelDetail>>(
    ["hotel", { id }],
    () => client(`hotel/detail`, { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useAddHotel = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Hotel>) =>
      client("hotel/add", {
        data: cleanObject(params),
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditHotel = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Hotel>) =>
      client("hotel/edit", {
        data: cleanObject(params),
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteHotel = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("hotel/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useHotelOptions = () => {
  const client = useHttp();
  return useQuery<HotelOption[]>(["hotel_options"], () =>
    client("hotel/options")
  );
};
