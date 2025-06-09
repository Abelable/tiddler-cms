import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";
import { cleanObject } from "utils/index";
import type {
  MallBanner,
  MallBannerListResult,
  MallBannerListSearchParams,
} from "types/mallBanner";

export const useMallBannerList = (
  params: Partial<MallBannerListSearchParams>
) => {
  const client = useHttp();
  return useQuery<MallBannerListResult>(["banner_list", params], () =>
    client("banner/list", { data: params, method: "POST" })
  );
};

export const useMallBanner = (id: number) => {
  const client = useHttp();
  return useQuery<Partial<MallBanner>>(
    ["banner", { id }],
    () => client("banner/detail", { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useAddMallBanner = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<MallBanner>) =>
      client("banner/add", {
        data: cleanObject(params),
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditMallBanner = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<MallBanner>) =>
      client("banner/edit", {
        data: cleanObject(params),
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useUpMallBanner = (queryKey: QueryKey) => {
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

export const useDownMallBanner = (queryKey: QueryKey) => {
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

export const useDeleteMallBanner = (queryKey: QueryKey) => {
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
