import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";
import { useEvaluationTag } from "service/evaluationTag";

export const useEvaluationTagListSearchParams = () => {
  const [params, setParams] = useUrlQueryParams([
    "scene",
    "type",
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

export const useEvaluationTagListQueryKey = () => {
  const [params] = useEvaluationTagListSearchParams();
  return ["evaluation_tag_list", params];
};

export const useEvaluationTagModal = () => {
  const [{ evaluationTagCreate }, setEvaluationTagModalOpen] =
    useUrlQueryParams(["evaluationTagCreate"]);
  const [{ editingEvaluationTagId }, setEditingEvaluationTagId] =
    useUrlQueryParams(["editingEvaluationTagId"]);
  const setUrlParams = useSetUrlSearchParams();
  const { data: editingEvaluationTag, isLoading } = useEvaluationTag(
    Number(editingEvaluationTagId)
  );

  const open = useCallback(
    () => setEvaluationTagModalOpen({ evaluationTagCreate: true }),
    [setEvaluationTagModalOpen]
  );
  const startEdit = useCallback(
    (id: number) =>
      setEditingEvaluationTagId({ editingEvaluationTagId: `${id}` }),
    [setEditingEvaluationTagId]
  );
  const close = useCallback(
    () => setUrlParams({ evaluationTagCreate: "", editingEvaluationTagId: "" }),
    [setUrlParams]
  );

  return {
    evaluationTagModalOpen:
      evaluationTagCreate === "true" || !!editingEvaluationTagId,
    editingEvaluationTagId,
    editingEvaluationTag,
    isLoading,
    open,
    startEdit,
    close,
  };
};
