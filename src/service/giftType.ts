import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";

import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";
import { cleanObject } from "utils/index";
import type {
  GiftTypeListResult,
  GiftTypeListSearchParams,
  GiftType,
  GiftTypeOption,
} from "types/giftType";

export const useGiftTypeList = (params: Partial<GiftTypeListSearchParams>) => {
  const client = useHttp();
  return useQuery<GiftTypeListResult>(["gift_type_list", params], () =>
    client("goods/gift/type/list", { data: params, method: "POST" })
  );
};

export const useGiftType = (id: number) => {
  const client = useHttp();
  return useQuery<Partial<GiftType>>(
    ["gift_type", { id }],
    () => client("goods/gift/type/detail", { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useAddGiftType = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<GiftType>) =>
      client("goods/gift/type/add", {
        data: cleanObject(params),
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditGiftType = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<GiftType>) =>
      client("goods/gift/type/edit", {
        data: cleanObject(params),
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useEditSort = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id, sort }: { id: number; sort: number }) =>
      client("goods/gift/type/edit_sort", {
        data: { id, sort },
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useEditStatus = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id, status }: { id: number; status: number }) =>
      client("goods/gift/type/edit_status", {
        data: { id, status },
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteGiftType = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("goods/gift/type/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useGiftTypeOptions = () => {
  const client = useHttp();
  return useQuery<GiftTypeOption[]>(["gift_type_options"], () =>
    client("goods/gift/type/options")
  );
};
