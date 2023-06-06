import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import { useApprovedConfig, useRejectConfig } from "./use-optimistic-options";
import type {
  ProviderDetail,
  ProviderOrdersResult,
  ProviderOrdersSearchParams,
  ProvidersResult,
  ProvidersSearchParams,
} from "types/scenicProvider";

export const useProviders = (params: Partial<ProvidersSearchParams>) => {
  const client = useHttp();
  return useQuery<ProvidersResult>(["scenic_providers", params], () =>
    client("scenic/provider/list", { data: params, method: "POST" })
  );
};

export const useProvider = (id: number) => {
  const client = useHttp();
  return useQuery<ProviderDetail>(
    ["scenic_provider", { id }],
    () => client(`scenic/provider/detail`, { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useApprovedProvider = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("scenic/provider/approved", {
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
      client("scenic/provider/reject", {
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
  return useQuery<ProviderOrdersResult>(
    ["scenic_provider_orders", params],
    () => client("scenic/provider/order_list", { data: params, method: "POST" })
  );
};
