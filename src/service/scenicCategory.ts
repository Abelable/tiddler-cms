import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import type {
  ScenicCategory,
  ScenicCategoriesResult,
  ScenicCategoriesSearchParams,
  ScenicCategoryOption,
} from "types/scenicCategory";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";
import { cleanObject } from "utils/index";

export const useScenicCategories = (
  params: Partial<ScenicCategoriesSearchParams>
) => {
  const client = useHttp();
  return useQuery<ScenicCategoriesResult>(["scenic_categories", params], () =>
    client("scenic/category/list", { data: params, method: "POST" })
  );
};

export const useScenicCategory = (id: number) => {
  const client = useHttp();
  return useQuery<Partial<ScenicCategory>>(
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
    (params: Partial<ScenicCategory>) =>
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
    (params: Partial<ScenicCategory>) =>
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
  return useQuery<ScenicCategoryOption[]>(["scenic_category_options"], () =>
    client("scenic/category/options")
  );
};
