import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";
import { cleanObject } from "utils/index";

import type { DataOption } from "types/common";
import type {
  Category,
  CategoriesResult,
  CategoriesSearchParams,
} from "types/category";

export const useHotelCategories = (params: Partial<CategoriesSearchParams>) => {
  const client = useHttp();
  return useQuery<CategoriesResult>(["hotel_categories", params], () =>
    client("hotel/category/list", { data: params, method: "POST" })
  );
};

export const useHotelCategory = (id: number) => {
  const client = useHttp();
  return useQuery<Partial<Category>>(
    ["hotel_category", { id }],
    () => client(`hotel/category/detail`, { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useAddHotelCategory = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Category>) =>
      client("hotel/category/add", {
        data: cleanObject(params),
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditHotelCategory = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Category>) =>
      client("hotel/category/edit", {
        data: cleanObject(params),
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteHotelCategory = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("hotel/category/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useHotelCategoryOptions = () => {
  const client = useHttp();
  return useQuery<DataOption[]>(["hotel_category_options"], () =>
    client("hotel/category/options")
  );
};
