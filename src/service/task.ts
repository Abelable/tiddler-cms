import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";
import { cleanObject } from "utils/index";
import type { Task, TaskListResult, TaskListSearchParams } from "types/task";

export const useTaskList = (params: Partial<TaskListSearchParams>) => {
  const client = useHttp();
  return useQuery<TaskListResult>(["task_list", params], () =>
    client("task/list", { data: params, method: "POST" })
  );
};

export const useTask = (id: number) => {
  const client = useHttp();
  return useQuery<Partial<Task>>(
    ["task", { id }],
    () => client("task/detail", { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useAddTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Task>) =>
      client("task/add", {
        data: cleanObject(params),
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Task>) =>
      client("task/edit", {
        data: cleanObject(params),
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useUpTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("task/up", {
        data: { id },
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDownTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("task/down", {
        data: { id },
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("task/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};
