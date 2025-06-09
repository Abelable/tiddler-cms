import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import {
  useAddConfig,
  useApprovedConfig,
  useDeleteConfig,
  useEditConfig,
  useRejectConfig,
} from "./use-optimistic-options";
import { cleanObject } from "utils/index";

import type { ProductOption } from "types/common";
import type {
  Goods,
  GoodsListResult,
  GoodsListSearchParams,
  GoodsDetail,
} from "types/goods";

export const useGoodsList = (params: Partial<GoodsListSearchParams>) => {
  const client = useHttp();
  return useQuery<GoodsListResult>(["goods_list", params], () =>
    client("goods/list", { data: params, method: "POST" })
  );
};

export const useGoods = (id: number) => {
  const client = useHttp();
  return useQuery<Partial<GoodsDetail>>(
    ["goods", { id }],
    () => client(`goods/detail`, { data: { id } }),
    {
      enabled: !!id,
      cacheTime: 0,
      refetchOnWindowFocus: false,
    }
  );
};

export const useApprovedGoods = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("goods/up", {
        data: { id },
        method: "POST",
      }),
    useApprovedConfig(queryKey)
  );
};

export const useRejectGoods = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (data: { id: number; failureReason: string }) =>
      client("goods/reject", {
        data,
        method: "POST",
      }),
    useRejectConfig(queryKey)
  );
};

export const useAddGoods = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Goods>) =>
      client("goods/add", {
        data: cleanObject(params),
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditGoods = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Goods>) =>
      client("goods/edit", {
        data: cleanObject(params),
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useEditViews = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id, views }: { id: number; views: number }) =>
      client("goods/edit_views", {
        data: { id, views },
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteGoods = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("goods/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useGoodsOptions = () => {
  const client = useHttp();
  return useQuery<ProductOption[]>(["goods_options"], () =>
    client("goods/options")
  );
};

export const useSelfGoodsOptions = () => {
  const client = useHttp();
  return useQuery<ProductOption[]>(["self_goods_options"], () =>
    client("goods/self_options")
  );
};
