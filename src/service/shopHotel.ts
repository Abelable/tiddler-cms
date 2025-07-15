import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import { useApproveConfig, useRejectConfig } from "./use-optimistic-options";
import type {
  ShopHotelListSearchParams,
  ShopHotelListResult,
} from "types/shopHotel";

export const useShopHotelList = (
  params: Partial<ShopHotelListSearchParams>
) => {
  const client = useHttp();
  return useQuery<ShopHotelListResult>(["shop_hotel_list", params], () =>
    client("hotel/shop/hotel/list", { data: params, method: "POST" })
  );
};

export const useApproveShopHotel = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("hotel/shop/hotel/approve", {
        data: { id },
        method: "POST",
      }),
    useApproveConfig(queryKey)
  );
};

export const useRejectShopHotel = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (data: { id: number; failureReason: string }) =>
      client("hotel/shop/hotel/reject", {
        data,
        method: "POST",
      }),
    useRejectConfig(queryKey)
  );
};

export const useDeleteShopHotel = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("hotel/shop/hotel/delete", {
        data: { id },
        method: "POST",
      }),
    useRejectConfig(queryKey)
  );
};
