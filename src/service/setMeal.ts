import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import {
  useApproveConfig,
  useDeleteConfig,
  useEditConfig,
  useRejectConfig,
} from "./use-optimistic-options";
import type {
  SetMealListResult,
  SetMealListSearchParams,
  SetMealDetail,
  SetMeal,
} from "types/setMeal";
import { cleanObject } from "utils";

export const useSetMealList = (params: Partial<SetMealListSearchParams>) => {
  const client = useHttp();
  return useQuery<SetMealListResult>(["set_meal_list", params], () =>
    client("catering/set_meal/list", { data: params, method: "POST" })
  );
};

export const useSetMeal = (id: number) => {
  const client = useHttp();
  return useQuery<Partial<SetMealDetail>>(
    ["set_meal", { id }],
    () => client(`catering/set_meal/detail`, { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useEditSetMealCommission = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<SetMeal>) =>
      client("catering/set_meal/edit_commission", {
        data: cleanObject(params),
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useApproveSetMeal = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<SetMeal>) =>
      client("catering/set_meal/approve", {
        data: cleanObject(params),
        method: "POST",
      }),
    useApproveConfig(queryKey)
  );
};

export const useRejectSetMeal = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (data: { id: number; failureReason: string }) =>
      client("catering/set_meal/reject", {
        data,
        method: "POST",
      }),
    useRejectConfig(queryKey)
  );
};

export const useDeleteSetMeal = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("catering/set_meal/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};
