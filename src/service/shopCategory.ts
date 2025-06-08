import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";
import { cleanObject } from "utils/index";

import type { DataOption } from "types/common";
import type { CategoriesSearchParams } from "types/category";
import type { ShopCategoriesResult, ShopCategory } from "types/shopCategory";

export const useShopCategories = (params: Partial<CategoriesSearchParams>) => {
  const client = useHttp();
  return useQuery<ShopCategoriesResult>(["shop_categories", params], () =>
    client("shop/category/list", { data: params, method: "POST" })
  );
};

export const useShopCategory = (id: number) => {
  const client = useHttp();
  return useQuery<Partial<ShopCategory>>(
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
    (params: Partial<ShopCategory>) =>
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
    (params: Partial<ShopCategory>) =>
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
  return useQuery<DataOption[]>(["shop_category_options"], () =>
    client("shop/category/options")
  );
};

export const useEditShopCategorySort = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id, sort }: { id: number; sort: number }) =>
      client("shop/category/edit_sort", {
        data: { id, sort },
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useEditShopCategoryVisible = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id, visible }: { id: number; visible: number }) =>
      client("shop/category/edit_visible", {
        data: { id, visible },
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};
