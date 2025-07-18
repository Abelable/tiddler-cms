import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import { useApproveConfig, useRejectConfig } from "./use-optimistic-options";
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
      client("catering/merchant/restaurant/list", {
        data: params,
        method: "POST",
      })
  );
};

export const useApproveProviderRestaurant = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("catering/merchant/restaurant/approve", {
        data: { id },
        method: "POST",
      }),
    useApproveConfig(queryKey)
  );
};

export const useRejectProviderRestaurant = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (data: { id: number; failureReason: string }) =>
      client("catering/merchant/restaurant/reject", {
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
      client("catering/merchant/restaurant/delete", {
        data: { id },
        method: "POST",
      }),
    useRejectConfig(queryKey)
  );
};
