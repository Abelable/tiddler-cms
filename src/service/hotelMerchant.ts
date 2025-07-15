import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import { useApproveConfig, useRejectConfig } from "./use-optimistic-options";
import type {
  MerchantDetail,
  MerchantsResult,
  MerchantsSearchParams,
} from "types/hotelMerchant";

export const useMerchants = (params: Partial<MerchantsSearchParams>) => {
  const client = useHttp();
  return useQuery<MerchantsResult>(["hotel_merchants", params], () =>
    client("hotel/merchant/list", { data: params, method: "POST" })
  );
};

export const useMerchant = (id: number) => {
  const client = useHttp();
  return useQuery<MerchantDetail>(
    ["hotel_merchant", { id }],
    () => client(`hotel/merchant/detail`, { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useApproveMerchant = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("hotel/merchant/approve", {
        data: { id },
        method: "POST",
      }),
    useApproveConfig(queryKey)
  );
};

export const useRejectMerchant = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (data: { id: number; failureReason: string }) =>
      client("hotel/merchant/reject", {
        data,
        method: "POST",
      }),
    useRejectConfig(queryKey)
  );
};
