import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import { useApprovedConfig, useRejectConfig } from "./use-optimistic-options";
import type {
  ProviderDetail,
  ProviderOrdersResult,
  ProviderOrdersSearchParams,
  ProvidersResult,
  ProvidersSearchParams,
} from "types/hotelProvider";

export const useProviders = (params: Partial<ProvidersSearchParams>) => {
  const client = useHttp();
  return useQuery<ProvidersResult>(["hotel_providers", params], () =>
    client("hotel/provider/list", { data: params, method: "POST" })
  );
};

export const useProvider = (id: number) => {
  const client = useHttp();
  return useQuery<ProviderDetail>(
    ["hotel_provider", { id }],
    () => client(`hotel/provider/detail`, { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useApprovedProvider = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("hotel/provider/approved", {
        data: { id },
        method: "POST",
      }),
    useApprovedConfig(queryKey)
  );
};

export const useRejectProvider = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (data: { id: number; failureReason: string }) =>
      client("hotel/provider/reject", {
        data,
        method: "POST",
      }),
    useRejectConfig(queryKey)
  );
};

export const useProviderOrders = (
  params: Partial<ProviderOrdersSearchParams>
) => {
  const client = useHttp();
  return useQuery<ProviderOrdersResult>(["hotel_provider_orders", params], () =>
    client("hotel/provider/order_list", { data: params, method: "POST" })
  );
};
