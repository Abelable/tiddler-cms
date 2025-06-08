import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";
import { cleanObject } from "utils/index";

import { DataOption } from "types/common";
import type {
  Category,
  CategoriesResult,
  CategoriesSearchParams,
} from "types/category";

export const useScenicCategories = (
  params: Partial<CategoriesSearchParams>
) => {
  const client = useHttp();
  return useQuery<CategoriesResult>(["scenic_categories", params], () =>
    client("scenic/category/list", { data: params, method: "POST" })
  );
};

export const useScenicCategory = (id: number) => {
  const client = useHttp();
  return useQuery<Partial<Category>>(
    ["scenic_category", { id }],
    () => client(`scenic/category/detail`, { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useAddScenicCategory = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Category>) =>
      client("scenic/category/add", {
        data: cleanObject(params),
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditScenicCategory = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Category>) =>
      client("scenic/category/edit", {
        data: cleanObject(params),
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteScenicCategory = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("scenic/category/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useScenicCategoryOptions = () => {
  const client = useHttp();
  return useQuery<DataOption[]>(["scenic_category_options"], () =>
    client("scenic/category/options")
  );
};
