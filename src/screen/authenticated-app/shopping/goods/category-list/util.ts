import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";
import { useGoodsCategory } from "service/goodsCategory";

export const useGoodsCategoriesSearchParams = () => {
  const [params, setParams] = useUrlQueryParams([
    "shopCategoryId",
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

export const useGoodsCategoriesQueryKey = () => {
  const [params] = useGoodsCategoriesSearchParams();
  return ["goods_categories", params];
};

export const useGoodsCategoryModal = () => {
  const [{ goodsCategoryCreate }, setGoodsCategoryModalOpen] =
    useUrlQueryParams(["goodsCategoryCreate"]);
  const [{ editingGoodsCategoryId }, setEditingGoodsCategoryId] =
    useUrlQueryParams(["editingGoodsCategoryId"]);
  const setUrlParams = useSetUrlSearchParams();
  const { data: editingGoodsCategory, isLoading } = useGoodsCategory(
    Number(editingGoodsCategoryId)
  );

  const open = useCallback(
    () => setGoodsCategoryModalOpen({ goodsCategoryCreate: true }),
    [setGoodsCategoryModalOpen]
  );
  const startEdit = useCallback(
    (id: number) =>
      setEditingGoodsCategoryId({ editingGoodsCategoryId: `${id}` }),
    [setEditingGoodsCategoryId]
  );
  const close = useCallback(
    () => setUrlParams({ goodsCategoryCreate: "", editingGoodsCategoryId: "" }),
    [setUrlParams]
  );

  return {
    goodsCategoryModalOpen:
      goodsCategoryCreate === "true" || !!editingGoodsCategoryId,
    editingGoodsCategoryId,
    editingGoodsCategory,
    isLoading,
    open,
    startEdit,
    close,
  };
};
