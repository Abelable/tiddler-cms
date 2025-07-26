import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";
import { cleanObject } from "utils/index";
import type {
  HotScenic,
  HotScenicListResult,
  HotScenicListSearchParams,
} from "types/hotScenic";

export const useHotScenicList = (
  params: Partial<HotScenicListSearchParams>
) => {
  const client = useHttp();
  return useQuery<HotScenicListResult>(["hot_scenic_list", params], () =>
    client("hot_scenic/list", { data: params, method: "POST" })
  );
};

export const useHotScenic = (id: number) => {
  const client = useHttp();
  return useQuery<Partial<HotScenic>>(
    ["hot_scenic", { id }],
    () => client("hot_scenic/detail", { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useAddHotScenic = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<HotScenic>) =>
      client("hot_scenic/add", {
        data: cleanObject(params),
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditHotScenic = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<HotScenic>) =>
      client("hot_scenic/edit", {
        data: cleanObject(params),
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useEditInterestedNumber = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id, number }: { id: number; number: number }) =>
      client("hot_scenic/edit_interested_number", {
        data: { id, number },
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useEditSort = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id, sort }: { id: number; sort: number }) =>
      client("hot_scenic/edit_sort", {
        data: { id, sort },
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteHotScenic = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("hot_scenic/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};
