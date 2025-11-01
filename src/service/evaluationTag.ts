import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";
import { cleanObject } from "utils/index";

import type {
  EvaluationTag,
  EvaluationTagListResult,
  EvaluationTagListSearchParams,
} from "types/evaluationTag";

export const useEvaluationTagList = (
  params: Partial<EvaluationTagListSearchParams>
) => {
  const client = useHttp();
  return useQuery<EvaluationTagListResult>(
    ["evaluation_tag_list", params],
    () => client("evaluation_tag/list", { data: params, method: "POST" })
  );
};

export const useEvaluationTag = (id: number) => {
  const client = useHttp();
  return useQuery<Partial<EvaluationTag>>(
    ["evaluation_tag", { id }],
    () => client(`evaluation_tag/detail`, { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useAddEvaluationTag = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<EvaluationTag>) =>
      client("evaluation_tag/add", {
        data: cleanObject(params),
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditEvaluationTag = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<EvaluationTag>) =>
      client("evaluation_tag/edit", {
        data: cleanObject(params),
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteEvaluationTag = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("evaluation_tag/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useEvaluationTagOptions = () => {
  const client = useHttp();
  return useQuery<{ id: number; content: string }[]>(
    ["evaluation_tag_options"],
    () => client("evaluation_tag/options")
  );
};
