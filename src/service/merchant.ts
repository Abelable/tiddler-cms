import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import { useDeleteConfig } from "./use-optimistic-options";
import type {
  Merchant,
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
  return useQuery<Partial<Merchant>>(
    ["merchant", { id }],
    () => client(`merchant/detail`, { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useDeleteMerchant = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("merchant/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};
