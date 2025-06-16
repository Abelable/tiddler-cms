import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";
import { cleanObject } from "utils/index";
import type {
  TopMedia,
  TopMediaListResult,
  TopMediaListSearchParams,
} from "types/topMedia";

export const useTopMediaList = (params: Partial<TopMediaListSearchParams>) => {
  const client = useHttp();
  return useQuery<TopMediaListResult>(["top_media_list", params], () =>
    client("media/top/list", { data: params, method: "POST" })
  );
};

export const useTopMedia = (id: number) => {
  const client = useHttp();
  return useQuery<Partial<TopMedia>>(
    ["top_media", { id }],
    () => client("media/top/detail", { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useAddTopMedia = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<TopMedia>) =>
      client("media/top/add", {
        data: cleanObject(params),
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditTopMedia = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<TopMedia>) =>
      client("media/top/edit", {
        data: cleanObject(params),
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteTopMedia = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("media/top/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};
