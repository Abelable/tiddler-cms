import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import { useApprovedConfig, useRejectConfig } from "./use-optimistic-options";
import type {
  ProviderRestaurantListSearchParams,
  ProviderRestaurantListResult,
} from "types/providerRestaurant";

export const useProviderRestaurantList = (
  params: Partial<ProviderRestaurantListSearchParams>
) => {
  const client = useHttp();
  return useQuery<ProviderRestaurantListResult>(
    ["provider_restaurant_list", params],
    () =>
      client("catering/provider/restaurant/list", {
        data: params,
        method: "POST",
      })
  );
};

export const useApprovedProviderRestaurant = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("catering/provider/restaurant/approved", {
        data: { id },
        method: "POST",
      }),
    useApprovedConfig(queryKey)
  );
};

export const useRejectProviderRestaurant = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (data: { id: number; failureReason: string }) =>
      client("catering/provider/restaurant/reject", {
        data,
        method: "POST",
      }),
    useRejectConfig(queryKey)
  );
};

export const useDeleteProviderRestaurant = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("catering/provider/restaurant/delete", {
        data: { id },
        method: "POST",
      }),
    useRejectConfig(queryKey)
  );
};
