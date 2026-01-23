import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "../http";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "../use-optimistic-options";
import { cleanObject } from "utils";

import type {
  NewYearGoodsListResult,
  NewYearGoodsListSearchParams,
} from "types/new-year/goods";

export const useNewYearGoodsList = (
  params: Partial<NewYearGoodsListSearchParams>
) => {
  const client = useHttp();
  return useQuery<NewYearGoodsListResult>(["new_year_goods_list", params], () =>
    client("new_year/goods/list", { data: params, method: "POST" })
  );
};

export const useAddNewYearGoods = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({
      goodsIds,
      luckScore,
      stock,
      limit,
    }: {
      goodsIds: number[];
      luckScore: number;
      stock: Number;
      limit: Number;
    }) =>
      client("new_year/goods/add", {
        data: cleanObject({ goodsIds, luckScore, stock, limit }),
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditLuckScore = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id, luckScore }: { id: number; luckScore: number }) =>
      client("new_year/goods/edit_luck_score", {
        data: { id, luckScore },
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useEditStock = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id, stock }: { id: number; stock: number }) =>
      client("new_year/goods/edit_stock", {
        data: { id, stock },
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useEditLimit = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id, limit }: { id: number; limit: number }) =>
      client("new_year/goods/edit_limit", {
        data: { id, limit },
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useEditSort = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id, sort }: { id: number; sort: number }) =>
      client("new_year/goods/edit_sort", {
        data: { id, sort },
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useUpNewYearGoods = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("new_year/goods/up", {
        data: { id },
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDownNewYearGoods = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("new_year/goods/down", {
        data: { id },
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteNewYearGoods = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("new_year/goods/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};
