import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";
import type {
  LakeCycleMediaListResult,
  LakeCycleMediaListSearchParams,
} from "types/lakeCycleMedia";

export const useLakeCycleMediaList = (
  params: Partial<LakeCycleMediaListSearchParams>
) => {
  const client = useHttp();
  return useQuery<LakeCycleMediaListResult>(
    ["lake_cycle_media_list", params],
    () =>
      client("trip_type/lake_cycle/media/list", {
        data: params,
        method: "POST",
      })
  );
};

export const useAddLakeCycleMedia = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: { mediaType: number; mediaIds: number[] }) =>
      client("trip_type/lake_cycle/media/add", {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditSort = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id, sort }: { id: number; sort: number }) =>
      client("trip_type/lake_cycle/media/edit_sort", {
        data: { id, sort },
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteLakeCycleMedia = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("trip_type/lake_cycle/media/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};
