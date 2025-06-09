import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";
import { cleanObject } from "utils/index";
import type {
  Banner,
  BannerListResult,
  BannerListSearchParams,
} from "types/banner";

export const useBannerList = (params: Partial<BannerListSearchParams>) => {
  const client = useHttp();
  return useQuery<BannerListResult>(["banner_list", params], () =>
    client("banner/list", { data: params, method: "POST" })
  );
};

export const useBanner = (id: number) => {
  const client = useHttp();
  return useQuery<Partial<Banner>>(
    ["banner", { id }],
    () => client("banner/detail", { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useAddBanner = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Banner>) =>
      client("banner/add", {
        data: cleanObject(params),
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditBanner = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Banner>) =>
      client("banner/edit", {
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
      client("banner/edit_sort", {
        data: { id, sort },
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useUpBanner = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("banner/up", {
        data: { id },
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDownBanner = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("banner/down", {
        data: { id },
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteBanner = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("banner/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};
