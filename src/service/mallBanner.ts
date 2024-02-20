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
  return useQuery<MallBannerListResult>(["mall_banner_list", params], () =>
    client("mall_banner/list", { data: params, method: "POST" })
  );
};

export const useMallBanner = (id: number) => {
  const client = useHttp();
  return useQuery<Partial<MallBanner>>(
    ["mall_banner", { id }],
    () => client("mall_banner/detail", { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useAddMallBanner = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<MallBanner>) =>
      client("mall_banner/add", {
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
      client("mall_banner/edit", {
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
      client("mall_banner/up", {
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
      client("mall_banner/down", {
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
      client("mall_banner/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};
