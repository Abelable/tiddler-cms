import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import { useApproveConfig, useRejectConfig } from "./use-optimistic-options";
import type {
  CateringProviderDetail,
  CateringProvidersResult,
  CateringProvidersSearchParams,
} from "types/cateringProvider";

export const useCateringProviders = (
  params: Partial<CateringProvidersSearchParams>
) => {
  const client = useHttp();
  return useQuery<CateringProvidersResult>(["catering_providers", params], () =>
    client("catering/provider/list", { data: params, method: "POST" })
  );
};

export const useCateringProvider = (id: number) => {
  const client = useHttp();
  return useQuery<CateringProviderDetail>(
    ["catering_provider", { id }],
    () => client(`catering/provider/detail`, { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useApproveCateringProvider = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("catering/provider/approve", {
        data: { id },
        method: "POST",
      }),
    useApproveConfig(queryKey)
  );
};

export const useRejectCateringProvider = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (data: { id: number; failureReason: string }) =>
      client("catering/provider/reject", {
        data,
        method: "POST",
      }),
    useRejectConfig(queryKey)
  );
};
