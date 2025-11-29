import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";
import { cleanObject } from "utils/index";
import type {
  LakeHomestay,
  LakeHomestayListResult,
  LakeHomestayListSearchParams,
} from "types/lakeHomestay";

export const useLakeHomestayList = (
  params: Partial<LakeHomestayListSearchParams>
) => {
  const client = useHttp();
  return useQuery<LakeHomestayListResult>(["lake_homestay_list", params], () =>
    client("theme/lake_homestay/list", { data: params, method: "POST" })
  );
};

export const useLakeHomestay = (id: number) => {
  const client = useHttp();
  return useQuery<Partial<LakeHomestay>>(
    ["lake_homestay", { id }],
    () => client("theme/lake_homestay/detail", { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useAddLakeHomestay = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<LakeHomestay>) =>
      client("theme/lake_homestay/add", {
        data: cleanObject(params),
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditLakeHomestay = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<LakeHomestay>) =>
      client("theme/lake_homestay/edit", {
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
      client("theme/lake_homestay/edit_sort", {
        data: { id, sort },
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteLakeHomestay = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("theme/lake_homestay/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};
