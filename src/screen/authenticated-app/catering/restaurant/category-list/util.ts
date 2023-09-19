import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";
import { useRestaurantCategory } from "service/restaurantCategory";

export const useRestaurantCategoriesSearchParams = () => {
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

export const useRestaurantCategoriesQueryKey = () => {
  const [params] = useRestaurantCategoriesSearchParams();
  return ["restaurant_categories", params];
};

export const useRestaurantCategoryModal = () => {
  const [{ restaurantCategoryCreate }, setRestaurantCategoryModalOpen] =
    useUrlQueryParams(["restaurantCategoryCreate"]);
  const [{ editingRestaurantCategoryId }, setEditingRestaurantCategoryId] =
    useUrlQueryParams(["editingRestaurantCategoryId"]);
  const setUrlParams = useSetUrlSearchParams();
  const { data: editingRestaurantCategory, isLoading } = useRestaurantCategory(
    Number(editingRestaurantCategoryId)
  );

  const open = useCallback(
    () => setRestaurantCategoryModalOpen({ restaurantCategoryCreate: true }),
    [setRestaurantCategoryModalOpen]
  );
  const startEdit = useCallback(
    (id: number) =>
      setEditingRestaurantCategoryId({ editingRestaurantCategoryId: `${id}` }),
    [setEditingRestaurantCategoryId]
  );
  const close = useCallback(
    () =>
      setUrlParams({
        restaurantCategoryCreate: "",
        editingRestaurantCategoryId: "",
      }),
    [setUrlParams]
  );

  return {
    restaurantCategoryModalOpen:
      restaurantCategoryCreate === "true" || !!editingRestaurantCategoryId,
    editingRestaurantCategoryId,
    editingRestaurantCategory,
    isLoading,
    open,
    startEdit,
    close,
  };
};
