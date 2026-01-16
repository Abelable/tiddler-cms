import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "../http";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "../use-optimistic-options";
import { cleanObject } from "utils/index";
import type {
  Prize,
  PrizeListResult,
  PrizeListSearchParams,
} from "types/new-year/prize";

export const usePrizeList = (params: Partial<PrizeListSearchParams>) => {
  const client = useHttp();
  return useQuery<PrizeListResult>(["new_year_prize_list", params], () =>
    client("new_year/prize/list", { data: params, method: "POST" })
  );
};

export const usePrize = (id: number) => {
  const client = useHttp();
  return useQuery<Partial<Prize>>(
    ["new_year_prize", { id }],
    () => client("new_year/prize/detail", { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useAddPrize = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Prize>) =>
      client("new_year/prize/add", {
        data: cleanObject(params),
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditPrize = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Prize>) =>
      client("new_year/prize/edit", {
        data: cleanObject(params),
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useEditIsBig = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id, isBig }: { id: number; isBig: number }) =>
      client("new_year/prize/edit_is_big", {
        data: { id, isBig },
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useEditSort = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id, sort }: { id: number; sort: number }) =>
      client("new_year/prize/edit_sort", {
        data: { id, sort },
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useUpPrize = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("new_year/prize/up", {
        data: { id },
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDownPrize = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("new_year/prize/down", {
        data: { id },
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeletePrize = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("new_year/prize/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};
