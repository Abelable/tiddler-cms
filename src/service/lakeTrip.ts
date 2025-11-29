import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";
import { cleanObject } from "utils/index";
import type {
  LakeTrip,
  LakeTripListResult,
  LakeTripListSearchParams,
} from "types/lakeTrip";

export const useLakeTripList = (params: Partial<LakeTripListSearchParams>) => {
  const client = useHttp();
  return useQuery<LakeTripListResult>(["lake_trip_list", params], () =>
    client("theme/lake_trip/list", { data: params, method: "POST" })
  );
};

export const useLakeTrip = (id: number) => {
  const client = useHttp();
  return useQuery<Partial<LakeTrip>>(
    ["lake_trip", { id }],
    () => client("theme/lake_trip/detail", { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useAddLakeTrip = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<LakeTrip>) =>
      client("theme/lake_trip/add", {
        data: cleanObject(params),
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditLakeTrip = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<LakeTrip>) =>
      client("theme/lake_trip/edit", {
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
      client("theme/lake_trip/edit_sort", {
        data: { id, sort },
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteLakeTrip = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("theme/lake_trip/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};
