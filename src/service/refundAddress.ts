import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";

import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";
import { cleanObject } from "utils/index";

import type { DataOption } from "types/common";
import type {
  RefundAddressListResult,
  RefundAddressListSearchParams,
  RefundAddress,
} from "types/refundAddress";

export const useRefundAddressList = (
  params: Partial<RefundAddressListSearchParams>
) => {
  const client = useHttp();
  return useQuery<RefundAddressListResult>(
    ["refund_address_list", params],
    () => client("refund_address/list", { data: params, method: "POST" })
  );
};

export const useRefundAddress = (id: number) => {
  const client = useHttp();
  return useQuery<RefundAddress>(
    ["refund_address", { id }],
    () => client(`refund_address/detail`, { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useAddRefundAddress = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<RefundAddress>) =>
      client("refund_address/add", {
        data: cleanObject(params),
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditRefundAddress = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<RefundAddress>) =>
      client("refund_address/edit", {
        data: cleanObject(params),
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteRefundAddress = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("refund_address/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useRefundAddressOptions = () => {
  const client = useHttp();
  return useQuery<DataOption[]>(["refund_address_options"], () =>
    client("refund_address/options")
  );
};
