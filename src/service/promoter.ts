import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";
import { cleanObject } from "utils";

import type {
  PromoterOption,
  PromoterListResult,
  PromoterListSearchParams,
  Promoter,
  TopPromoterListResult,
} from "types/promoter";
import type { PageParams } from "types/common";

export const usePromoterList = (params: Partial<PromoterListSearchParams>) => {
  const client = useHttp();
  return useQuery<PromoterListResult>(["promoter_list", params], () =>
    client("promoter/list", { data: params, method: "POST" })
  );
};

export const usePromoter = (id: number) => {
  const client = useHttp();
  return useQuery<Partial<Promoter>>(
    ["promoter", { id }],
    () => client(`promoter/detail`, { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useAddPromoter = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({
      userId,
      level,
      scene,
      duration,
    }: {
      userId: number;
      level: number;
      scene: number;
      duration: number;
    }) =>
      client("promoter/add", {
        data: { userId, level, scene, duration },
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditPromoter = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({
      id,
      level,
      scene,
      duration,
    }: {
      id: number;
      level: number;
      scene: number;
      duration: number;
    }) =>
      client("promoter/edit", {
        data: cleanObject({ id, level, scene, duration }),
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeletePromoter = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("promoter/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};

export const usePromoterOptions = () => {
  const client = useHttp();
  return useQuery<PromoterOption[]>(["promoter_options"], () =>
    client("promoter/options")
  );
};

export const useTopPromoterList = (params: Partial<PageParams>) => {
  const client = useHttp();
  return useQuery<TopPromoterListResult>(["top_promoter_list", params], () =>
    client("promoter/top_list", { data: params, method: "POST" })
  );
};
