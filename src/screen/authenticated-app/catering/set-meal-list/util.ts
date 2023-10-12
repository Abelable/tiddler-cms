import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";
import { useSetMeal } from "service/setMeal";

export const useSetMealListSearchParams = () => {
  const [params, setParams] = useUrlQueryParams([
    "name",
    "restaurantId",
    "status",
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

export const useSetMealListQueryKey = () => {
  const [params] = useSetMealListSearchParams();
  return ["set_meal_list", params];
};

export const useSetMealModal = () => {
  const [{ editingSetMealId }, setEditingSetMealId] = useUrlQueryParams([
    "editingSetMealId",
  ]);
  const setUrlParams = useSetUrlSearchParams();
  const {
    data: editingSetMeal,
    isLoading,
    error,
  } = useSetMeal(Number(editingSetMealId));

  const open = useCallback(
    (id: number) => setEditingSetMealId({ editingSetMealId: `${id}` }),
    [setEditingSetMealId]
  );
  const close = useCallback(
    () => setUrlParams({ setMealCreate: "", editingSetMealId: "" }),
    [setUrlParams]
  );

  return {
    setMealModalOpen: !!editingSetMealId,
    editingSetMealId,
    editingSetMeal,
    isLoading,
    error,
    open,
    close,
  };
};

export const useRejectModal = () => {
  const [{ rejectSetMealId }, setRejectSetMealId] = useUrlQueryParams([
    "rejectSetMealId",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    (id: number) => setRejectSetMealId({ rejectSetMealId: `${id}` }),
    [setRejectSetMealId]
  );
  const close = useCallback(
    () => setUrlParams({ rejectSetMealId: "" }),
    [setUrlParams]
  );

  return {
    rejectModalOpen: !!rejectSetMealId,
    rejectSetMealId,
    open,
    close,
  };
};
