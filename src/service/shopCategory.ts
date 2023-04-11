import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import type {
  Category,
  CategoriesResult,
  CategoriesSearchParams,
  CategoryOption,
} from "types/category";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";
import { cleanObject } from "utils/index";

export const useShopCategories = (params: Partial<CategoriesSearchParams>) => {
  const client = useHttp();
  return useQuery<CategoriesResult>(["shop_categories", params], () =>
    client("shop/category/list", { data: params, method: "POST" })
  );
};

export const useShopCategory = (id: number) => {
  const client = useHttp();
  return useQuery<Partial<Category>>(
    ["shop_category", { id }],
    () => client(`shop/category/detail`, { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useAddShopCategory = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Category>) =>
      client("shop/category/add", {
        data: cleanObject(params),
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditShopCategory = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Category>) =>
      client("shop/category/edit", {
        data: cleanObject(params),
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteShopCategory = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("shop/category/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useShopCategoryOptions = () => {
  const client = useHttp();
  return useQuery<CategoryOption[]>(["shop_category_options"], () =>
    client("shop/category/options")
  );
};
