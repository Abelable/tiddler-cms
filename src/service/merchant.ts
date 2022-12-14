import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import {
  useApprovedMerchantConfig,
  useEditConfig,
} from "./use-optimistic-options";
import type {
  MerchantDetail,
  MerchantOrdersResult,
  MerchantOrdersSearchParams,
  MerchantsResult,
  MerchantsSearchParams,
} from "types/merchant";

export const useMerchants = (params: Partial<MerchantsSearchParams>) => {
  const client = useHttp();
  return useQuery<MerchantsResult>(["merchants", params], () =>
    client("merchant/list", { data: params, method: "POST" })
  );
};

export const useMerchant = (id: number) => {
  const client = useHttp();
  return useQuery<MerchantDetail>(
    ["merchant", { id }],
    () => client(`merchant/detail`, { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useApprovedMerchant = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("merchant/approved", {
        data: { id },
        method: "POST",
      }),
    useApprovedMerchantConfig(queryKey)
  );
};

export const useRejectMerchant = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: { id: number; failureReason: string }) =>
      client("merchant/reject", {
        data: params,
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useMerchantOrders = (
  params: Partial<MerchantOrdersSearchParams>
) => {
  const client = useHttp();
  return useQuery<MerchantOrdersResult>(["merchant_orders", params], () =>
    client("merchant/order_list", { data: params, method: "POST" })
  );
};
