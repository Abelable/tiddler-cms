import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";
import { cleanObject } from "utils/index";
import type {
  NightTrip,
  NightTripListResult,
  NightTripListSearchParams,
} from "types/nightTrip";

export const useNightTripList = (
  params: Partial<NightTripListSearchParams>
) => {
  const client = useHttp();
  return useQuery<NightTripListResult>(["night_trip_list", params], () =>
    client("trip_type/night_trip/list", { data: params, method: "POST" })
  );
};

export const useNightTrip = (id: number) => {
  const client = useHttp();
  return useQuery<Partial<NightTrip>>(
    ["night_trip", { id }],
    () => client("trip_type/night_trip/detail", { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useAddNightTrip = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<NightTrip>) =>
      client("trip_type/night_trip/add", {
        data: cleanObject(params),
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditNightTrip = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<NightTrip>) =>
      client("trip_type/night_trip/edit", {
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
      client("trip_type/night_trip/edit_sort", {
        data: { id, sort },
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteNightTrip = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("trip_type/night_trip/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};
