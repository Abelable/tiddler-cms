import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import {
  useAddConfig,
  useApprovedConfig,
  useDeleteConfig,
  useEditConfig,
  useRejectConfig,
} from "./use-optimistic-options";
import { cleanObject } from "utils/index";

import type { OperatorOption } from "types/common";
import type {
  Scenic,
  ScenicListResult,
  ScenicListSearchParams,
  ScenicDetail,
} from "types/scenic";

export const useScenicList = (params: Partial<ScenicListSearchParams>) => {
  const client = useHttp();
  return useQuery<ScenicListResult>(["scenic_list", params], () =>
    client("scenic/list", { data: params, method: "POST" })
  );
};

export const useScenic = (id: number) => {
  const client = useHttp();
  return useQuery<Partial<ScenicDetail>>(
    ["scenic", { id }],
    () => client(`scenic/detail`, { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useApprovedScenic = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("scenic/up", {
        data: { id },
        method: "POST",
      }),
    useApprovedConfig(queryKey)
  );
};

export const useRejectScenic = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (data: { id: number; failureReason: string }) =>
      client("scenic/reject", {
        data,
        method: "POST",
      }),
    useRejectConfig(queryKey)
  );
};

export const useAddScenic = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Scenic>) =>
      client("scenic/add", {
        data: cleanObject(params),
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditScenic = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Scenic>) =>
      client("scenic/edit", {
        data: cleanObject(params),
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteScenic = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("scenic/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useScenicOptions = () => {
  const client = useHttp();
  return useQuery<OperatorOption[]>(["scenic_options"], () =>
    client("scenic/options")
  );
};
