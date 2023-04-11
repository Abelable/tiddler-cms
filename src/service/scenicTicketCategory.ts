import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import type {
  Category,
  CategoriesResult,
  CategoriesSearchParams,
} from "types/category";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";
import { cleanObject } from "utils/index";

export const useScenicTicketCategories = (
  params: Partial<CategoriesSearchParams>
) => {
  const client = useHttp();
  return useQuery<CategoriesResult>(["scenic_ticket_categories", params], () =>
    client("scenic/ticket/category/list", { data: params, method: "POST" })
  );
};

export const useScenicTicketCategory = (id: number) => {
  const client = useHttp();
  return useQuery<Partial<Category>>(
    ["scenic_ticket_category", { id }],
    () => client(`scenic/ticket/category/detail`, { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useAddScenicTicketCategory = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Category>) =>
      client("scenic/ticket/category/add", {
        data: cleanObject(params),
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditScenicTicketCategory = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Category>) =>
      client("scenic/ticket/category/edit", {
        data: cleanObject(params),
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteScenicTicketCategory = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("scenic/ticket/category/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};
