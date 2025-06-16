import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import { useAddConfig, useDeleteConfig } from "./use-optimistic-options";
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
