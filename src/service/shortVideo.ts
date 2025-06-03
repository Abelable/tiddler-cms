import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";
import { cleanObject } from "utils/index";

import type {
  ShortVideo,
  ShortVideoListResult,
  ShortVideoListSearchParams,
} from "types/shortVideo";

export const useShortVideoList = (
  params: Partial<ShortVideoListSearchParams>
) => {
  const client = useHttp();
  return useQuery<ShortVideoListResult>(["shortVideo_list", params], () =>
    client("media/short_video/list", { data: params, method: "POST" })
  );
};

export const useShortVideo = (id: number) => {
  const client = useHttp();
  return useQuery<Partial<ShortVideo>>(
    ["shortVideo", { id }],
    () => client(`media/short_video/detail`, { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useAddShortVideo = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<ShortVideo>) =>
      client("media/short_video/add", {
        data: cleanObject(params),
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditShortVideo = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<ShortVideo>) =>
      client("media/short_video/edit", {
        data: cleanObject(params),
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteShortVideo = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("media/short_video/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};
