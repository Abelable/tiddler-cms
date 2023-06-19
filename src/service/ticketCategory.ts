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

export const useTicketCategories = (
  params: Partial<CategoriesSearchParams>
) => {
  const client = useHttp();
  return useQuery<CategoriesResult>(["ticket_categories", params], () =>
    client("ticket/category/list", { data: params, method: "POST" })
  );
};

export const useTicketCategory = (id: number) => {
  const client = useHttp();
  return useQuery<Partial<Category>>(
    ["ticket_category", { id }],
    () => client(`ticket/category/detail`, { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useAddTicketCategory = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Category>) =>
      client("ticket/category/add", {
        data: cleanObject(params),
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditTicketCategory = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Category>) =>
      client("ticket/category/edit", {
        data: cleanObject(params),
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteTicketCategory = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("ticket/category/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useTicketCategoryOptions = () => {
  const client = useHttp();
  return useQuery<CategoryOption[]>(["ticket_category_options"], () =>
    client("ticket/category/options")
  );
};
