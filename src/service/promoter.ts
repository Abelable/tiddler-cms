import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import { useAddConfig, useDeleteConfig } from "./use-optimistic-options";

import type {
  PromoterOption,
  PromoterListResult,
  PromoterListSearchParams,
  Promoter,
  TopPromoterListResult,
} from "types/promoter";
import { PageParams } from "types/common";

export const usePromoterList = (params: Partial<PromoterListSearchParams>) => {
  const client = useHttp();
  return useQuery<PromoterListResult>(["promoter_list", params], () =>
    client("team/promoter/list", { data: params, method: "POST" })
  );
};

export const usePromoter = (id: number) => {
  const client = useHttp();
  return useQuery<Partial<Promoter>>(
    ["promoter", { id }],
    () => client(`team/promoter/detail`, { data: { id } }),
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
    }: {
      userId: number;
      level: number;
      scene: number;
    }) =>
      client("team/promoter/add", {
        data: { userId, level, scene },
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useChangeLevel = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id, level, scene }: { id: number; level: number; scene: number }) =>
      client("team/promoter/change_level", {
        data: { id, level, scene },
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useDeletePromoter = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("team/promoter/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};

export const usePromoterOptions = () => {
  const client = useHttp();
  return useQuery<PromoterOption[]>(["promoter_options"], () =>
    client("team/promoter/options")
  );
};

export const useTopPromoterList = (params: Partial<PageParams>) => {
  const client = useHttp();
  return useQuery<TopPromoterListResult>(["top_promoter_list", params], () =>
    client("team/promoter/top_list", { data: params, method: "POST" })
  );
};
