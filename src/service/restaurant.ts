import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import {
  useAddConfig,
  useApprovedConfig,
  useDeleteConfig,
  useEditConfig,
  useRejectConfig,
} from "./use-optimistic-options";
import { cleanObject } from "utils/index";
import type {
  Restaurant,
  RestaurantListResult,
  RestaurantListSearchParams,
  RestaurantDetail,
  RestaurantOption,
} from "types/restaurant";

export const useRestaurantList = (
  params: Partial<RestaurantListSearchParams>
) => {
  const client = useHttp();
  return useQuery<RestaurantListResult>(["restaurant_list", params], () =>
    client("catering/restaurant/list", { data: params, method: "POST" })
  );
};

export const useRestaurant = (id: number) => {
  const client = useHttp();
  return useQuery<Partial<RestaurantDetail>>(
    ["restaurant", { id }],
    () => client(`catering/restaurant/detail`, { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useApprovedRestaurant = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("catering/restaurant/up", {
        data: { id },
        method: "POST",
      }),
    useApprovedConfig(queryKey)
  );
};

export const useRejectRestaurant = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (data: { id: number; failureReason: string }) =>
      client("catering/restaurant/reject", {
        data,
        method: "POST",
      }),
    useRejectConfig(queryKey)
  );
};

export const useAddRestaurant = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Restaurant>) =>
      client("catering/restaurant/add", {
        data: cleanObject(params),
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditRestaurant = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Restaurant>) =>
      client("catering/restaurant/edit", {
        data: cleanObject(params),
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteRestaurant = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("catering/restaurant/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useRestaurantOptions = () => {
  const client = useHttp();
  return useQuery<RestaurantOption[]>(["restaurant_options"], () =>
    client("catering/restaurant/options")
  );
};
