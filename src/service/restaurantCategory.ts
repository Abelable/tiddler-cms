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

export const useRestaurantCategories = (
  params: Partial<CategoriesSearchParams>
) => {
  const client = useHttp();
  return useQuery<CategoriesResult>(["restaurant_categories", params], () =>
    client("catering/restaurant/category/list", {
      data: params,
      method: "POST",
    })
  );
};

export const useRestaurantCategory = (id: number) => {
  const client = useHttp();
  return useQuery<Partial<Category>>(
    ["restaurant_category", { id }],
    () => client(`catering/restaurant/category/detail`, { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useAddRestaurantCategory = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Category>) =>
      client("catering/restaurant/category/add", {
        data: cleanObject(params),
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditRestaurantCategory = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Category>) =>
      client("catering/restaurant/category/edit", {
        data: cleanObject(params),
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteRestaurantCategory = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("catering/restaurant/category/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useRestaurantCategoryOptions = () => {
  const client = useHttp();
  return useQuery<CategoryOption[]>(["restaurant_category_options"], () =>
    client("catering/restaurant/category/options")
  );
};
