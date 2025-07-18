import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import { useApproveConfig, useRejectConfig } from "./use-optimistic-options";
import type {
  CateringMerchantDetail,
  CateringMerchantsResult,
  CateringMerchantsSearchParams,
} from "types/cateringMerchant";

export const useCateringMerchants = (
  params: Partial<CateringMerchantsSearchParams>
) => {
  const client = useHttp();
  return useQuery<CateringMerchantsResult>(
    ["catering_merchant_list", params],
    () => client("catering/merchant/list", { data: params, method: "POST" })
  );
};

export const useCateringMerchant = (id: number) => {
  const client = useHttp();
  return useQuery<CateringMerchantDetail>(
    ["catering_merchant", { id }],
    () => client(`catering/merchant/detail`, { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useApproveCateringMerchant = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("catering/merchant/approve", {
        data: { id },
        method: "POST",
      }),
    useApproveConfig(queryKey)
  );
};

export const useRejectCateringMerchant = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (data: { id: number; failureReason: string }) =>
      client("catering/merchant/reject", {
        data,
        method: "POST",
      }),
    useRejectConfig(queryKey)
  );
};
