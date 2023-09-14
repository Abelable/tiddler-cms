import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";
import { useShopCategory } from "service/shopCategory";

export const useShopCategoriesSearchParams = () => {
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

export const useShopCategoriesQueryKey = () => {
  const [params] = useShopCategoriesSearchParams();
  return ["shop_categories", params];
};

export const useShopCategoryModal = () => {
  const [{ shopCategoryCreate }, setShopCategoryModalOpen] = useUrlQueryParams([
    "shopCategoryCreate",
  ]);
  const [{ editingShopCategoryId }, setEditingShopCategoryId] =
    useUrlQueryParams(["editingShopCategoryId"]);
  const setUrlParams = useSetUrlSearchParams();
  const { data: editingShopCategory, isLoading } = useShopCategory(
    Number(editingShopCategoryId)
  );

  const open = useCallback(
    () => setShopCategoryModalOpen({ shopCategoryCreate: true }),
    [setShopCategoryModalOpen]
  );
  const startEdit = useCallback(
    (id: number) =>
      setEditingShopCategoryId({ editingShopCategoryId: `${id}` }),
    [setEditingShopCategoryId]
  );
  const close = useCallback(
    () => setUrlParams({ shopCategoryCreate: "", editingShopCategoryId: "" }),
    [setUrlParams]
  );

  return {
    shopCategoryModalOpen:
      shopCategoryCreate === "true" || !!editingShopCategoryId,
    editingShopCategoryId,
    editingShopCategory,
    isLoading,
    open,
    startEdit,
    close,
  };
};
