import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";
import { cleanObject } from "utils/index";
import type {
  StarTrip,
  StarTripListResult,
  StarTripListSearchParams,
} from "types/starTrip";

export const useStarTripList = (params: Partial<StarTripListSearchParams>) => {
  const client = useHttp();
  return useQuery<StarTripListResult>(["star_trip_list", params], () =>
    client("theme/star_trip/list", { data: params, method: "POST" })
  );
};

export const useStarTrip = (id: number) => {
  const client = useHttp();
  return useQuery<Partial<StarTrip>>(
    ["star_trip", { id }],
    () => client("theme/star_trip/detail", { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useAddStarTrip = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<StarTrip>) =>
      client("theme/star_trip/add", {
        data: cleanObject(params),
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditStarTrip = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<StarTrip>) =>
      client("theme/star_trip/edit", {
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
      client("theme/star_trip/edit_sort", {
        data: { id, sort },
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteStarTrip = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("theme/star_trip/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};
