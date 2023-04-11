import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";
import { useScenicCategory } from "service/scenicCategory";

export const useScenicCategoriesSearchParams = () => {
  const [params, setParams] = useUrlQueryParams(["page", "limit"]);
  return [
    useMemo(
      () => ({
        page: Number(params.page) || 1,
        limit: Number(params.limit) || 10,
      }),
      [params]
    ),
    setParams,
  ] as const;
};

export const useScenicCategoriesQueryKey = () => {
  const [params] = useScenicCategoriesSearchParams();
  return ["scenic_categories", params];
};

export const useScenicCategoryModal = () => {
  const [{ scenicCategoryCreate }, setScenicCategoryModalOpen] =
    useUrlQueryParams(["scenicCategoryCreate"]);
  const [{ editingScenicCategoryId }, setEditingScenicCategoryId] =
    useUrlQueryParams(["editingScenicCategoryId"]);
  const setUrlParams = useSetUrlSearchParams();
  const { data: editingScenicCategory, isLoading } = useScenicCategory(
    Number(editingScenicCategoryId)
  );

  const open = useCallback(
    () => setScenicCategoryModalOpen({ scenicCategoryCreate: true }),
    [setScenicCategoryModalOpen]
  );
  const startEdit = useCallback(
    (id: number) =>
      setEditingScenicCategoryId({ editingScenicCategoryId: `${id}` }),
    [setEditingScenicCategoryId]
  );
  const close = useCallback(
    () =>
      setUrlParams({ scenicCategoryCreate: "", editingScenicCategoryId: "" }),
    [setUrlParams]
  );

  return {
    scenicCategoryModalOpen:
      scenicCategoryCreate === "true" || !!editingScenicCategoryId,
    editingScenicCategoryId,
    editingScenicCategory,
    isLoading,
    open,
    startEdit,
    close,
  };
};
