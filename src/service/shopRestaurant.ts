import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import { useApproveConfig, useRejectConfig } from "./use-optimistic-options";
import type {
  ShopRestaurantListSearchParams,
  ShopRestaurantListResult,
} from "types/shopRestaurant";

export const useShopRestaurantList = (
  params: Partial<ShopRestaurantListSearchParams>
) => {
  const client = useHttp();
  return useQuery<ShopRestaurantListResult>(
    ["shop_restaurant_list", params],
    () =>
      client("catering/shop/restaurant/list", {
        data: params,
        method: "POST",
      })
  );
};

export const useApproveShopRestaurant = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("catering/shop/restaurant/approve", {
        data: { id },
        method: "POST",
      }),
    useApproveConfig(queryKey)
  );
};

export const useRejectShopRestaurant = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (data: { id: number; failureReason: string }) =>
      client("catering/shop/restaurant/reject", {
        data,
        method: "POST",
      }),
    useRejectConfig(queryKey)
  );
};

export const useDeleteShopRestaurant = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("catering/shop/restaurant/delete", {
        data: { id },
        method: "POST",
      }),
    useRejectConfig(queryKey)
  );
};
