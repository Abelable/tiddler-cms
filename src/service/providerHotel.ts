import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import { useApproveConfig, useRejectConfig } from "./use-optimistic-options";
import type {
  ProviderHotelListSearchParams,
  ProviderHotelListResult,
} from "types/providerHotel";

export const useProviderHotelList = (
  params: Partial<ProviderHotelListSearchParams>
) => {
  const client = useHttp();
  return useQuery<ProviderHotelListResult>(
    ["provider_hotel_list", params],
    () => client("hotel/provider/hotel/list", { data: params, method: "POST" })
  );
};

export const useApproveProviderHotel = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("hotel/provider/hotel/approve", {
        data: { id },
        method: "POST",
      }),
    useApproveConfig(queryKey)
  );
};

export const useRejectProviderHotel = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (data: { id: number; failureReason: string }) =>
      client("hotel/provider/hotel/reject", {
        data,
        method: "POST",
      }),
    useRejectConfig(queryKey)
  );
};

export const useDeleteProviderHotel = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("hotel/provider/hotel/delete", {
        data: { id },
        method: "POST",
      }),
    useRejectConfig(queryKey)
  );
};
