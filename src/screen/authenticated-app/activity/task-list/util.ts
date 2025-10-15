import { useCallback, useMemo } from "react";
import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useTask } from "service/task";

export const useTaskListSearchParams = () => {
  const [params, setParams] = useUrlQueryParams([
    "status",
    "productType",
    "productName",
    "page",
    "limit",
  ]);
  return [
    useMemo(
      () => ({
        page: Number(params.page) || 1,
        limit: Number(params.limit) || 10,
        ...params,
      }),
      [params]
    ),
    setParams,
  ] as const;
};

export const useTaskListQueryKey = () => {
  const [params] = useTaskListSearchParams();
  return ["task_list", params];
};

export const useTaskModal = () => {
  const [{ taskCreate }, setTaskModalOpen] = useUrlQueryParams(["taskCreate"]);
  const [{ editingTaskId }, setEditingTaskId] = useUrlQueryParams([
    "editingTaskId",
  ]);
  const setUrlParams = useSetUrlSearchParams();
  const { data: editingTask, isLoading } = useTask(Number(editingTaskId));

  const open = useCallback(
    () => setTaskModalOpen({ taskCreate: true }),
    [setTaskModalOpen]
  );
  const startEdit = useCallback(
    (id: number) => setEditingTaskId({ editingTaskId: `${id}` }),
    [setEditingTaskId]
  );
  const close = useCallback(
    () => setUrlParams({ taskCreate: "", editingTaskId: "" }),
    [setUrlParams]
  );

  return {
    taskModalOpen: taskCreate === "true" || !!editingTaskId,
    editingTaskId,
    editingTask,
    isLoading,
    open,
    startEdit,
    close,
  };
};
