import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";
import { cleanObject } from "utils/index";
import type {
  LakeCycle,
  LakeCycleListResult,
  LakeCycleListSearchParams,
} from "types/lakeCycle";

export const useLakeCycleList = (
  params: Partial<LakeCycleListSearchParams>
) => {
  const client = useHttp();
  return useQuery<LakeCycleListResult>(["lake_cycle_list", params], () =>
    client("theme/lake_cycle/list", { data: params, method: "POST" })
  );
};

export const useLakeCycle = (id: number) => {
  const client = useHttp();
  return useQuery<Partial<LakeCycle>>(
    ["lake_cycle", { id }],
    () => client("theme/lake_cycle/detail", { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useAddLakeCycle = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<LakeCycle>) =>
      client("theme/lake_cycle/add", {
        data: cleanObject(params),
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditLakeCycle = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<LakeCycle>) =>
      client("theme/lake_cycle/edit", {
        data: cleanObject(params),
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useEditSort = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id, sort }: { id: number; sort: number }) =>
      client("theme/lake_cycle/edit_sort", {
        data: { id, sort },
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteLakeCycle = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("theme/lake_cycle/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};
