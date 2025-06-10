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
  PickupAddressListResult,
  PickupAddressListSearchParams,
  PickupAddress,
} from "types/pickupAddress";

export const usePickupAddressList = (
  params: Partial<PickupAddressListSearchParams>
) => {
  const client = useHttp();
  return useQuery<PickupAddressListResult>(
    ["pickup_address_list", params],
    () => client("pickup_address/list", { data: params, method: "POST" })
  );
};

export const usePickupAddress = (id: number) => {
  const client = useHttp();
  return useQuery<PickupAddress>(
    ["pickup_address", { id }],
    () => client(`pickup_address/detail`, { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useAddPickupAddress = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<PickupAddress>) =>
      client("pickup_address/add", {
        data: cleanObject(params),
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditPickupAddress = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<PickupAddress>) =>
      client("pickup_address/edit", {
        data: cleanObject(params),
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeletePickupAddress = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("pickup_address/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};

export const usePickupAddressOptions = () => {
  const client = useHttp();
  return useQuery<DataOption[]>(["pickup_address_options"], () =>
    client("pickup_address/options")
  );
};
