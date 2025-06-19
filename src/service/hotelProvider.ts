import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import { useApproveConfig, useRejectConfig } from "./use-optimistic-options";
import type {
  ProviderDetail,
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

export const useApproveProvider = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("hotel/provider/approve", {
        data: { id },
        method: "POST",
      }),
    useApproveConfig(queryKey)
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
