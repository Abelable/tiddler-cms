import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";
import { cleanObject } from "utils/index";

import type { ProductOption } from "types/common";
import type {
  Scenic,
  ScenicListResult,
  ScenicListSearchParams,
  ScenicDetail,
} from "types/scenic";

export const useScenicList = (params: Partial<ScenicListSearchParams>) => {
  const client = useHttp();
  return useQuery<ScenicListResult>(["scenic_list", params], () =>
    client("scenic/list", { data: params, method: "POST" })
  );
};

export const useScenic = (id: number) => {
  const client = useHttp();
  return useQuery<Partial<ScenicDetail>>(
    ["scenic", { id }],
    () => client(`scenic/detail`, { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useAddScenic = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Scenic>) =>
      client("scenic/add", {
        data: cleanObject(params),
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditScenic = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Scenic>) =>
      client("scenic/edit", {
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
      client("scenic/edit_views", {
        data: { id, views },
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteScenic = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("scenic/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useScenicOptions = () => {
  const client = useHttp();
  return useQuery<ProductOption[]>(["scenic_options"], () =>
    client("scenic/options")
  );
};
