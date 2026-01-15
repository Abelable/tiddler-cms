import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "../http";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "../use-optimistic-options";
import { cleanObject } from "utils/index";
import type {
  Task,
  TaskListResult,
  TaskListSearchParams,
} from "types/new-year/task";

export const useTaskList = (params: Partial<TaskListSearchParams>) => {
  const client = useHttp();
  return useQuery<TaskListResult>(["new_year_task_list", params], () =>
    client("new_year/task/list", { data: params, method: "POST" })
  );
};

export const useTask = (id: number) => {
  const client = useHttp();
  return useQuery<Partial<Task>>(
    ["new_year_task", { id }],
    () => client("new_year/task/detail", { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useAddTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Task>) =>
      client("new_year/task/add", {
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
      client("new_year/task/edit", {
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
      client("new_year/task/edit_sort", {
        data: { id, sort },
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("new_year/task/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};
