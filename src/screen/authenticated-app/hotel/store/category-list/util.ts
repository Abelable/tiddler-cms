import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";
import { useHotelCategory } from "service/hotelCategory";

export const useHotelCategoriesSearchParams = () => {
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

export const useHotelCategoriesQueryKey = () => {
  const [params] = useHotelCategoriesSearchParams();
  return ["hotel_categories", params];
};

export const useHotelCategoryModal = () => {
  const [{ hotelCategoryCreate }, setHotelCategoryModalOpen] =
    useUrlQueryParams(["hotelCategoryCreate"]);
  const [{ editingHotelCategoryId }, setEditingHotelCategoryId] =
    useUrlQueryParams(["editingHotelCategoryId"]);
  const setUrlParams = useSetUrlSearchParams();
  const { data: editingHotelCategory, isLoading } = useHotelCategory(
    Number(editingHotelCategoryId)
  );

  const open = useCallback(
    () => setHotelCategoryModalOpen({ hotelCategoryCreate: true }),
    [setHotelCategoryModalOpen]
  );
  const startEdit = useCallback(
    (id: number) =>
      setEditingHotelCategoryId({ editingHotelCategoryId: `${id}` }),
    [setEditingHotelCategoryId]
  );
  const close = useCallback(
    () => setUrlParams({ hotelCategoryCreate: "", editingHotelCategoryId: "" }),
    [setUrlParams]
  );

  return {
    hotelCategoryModalOpen:
      hotelCategoryCreate === "true" || !!editingHotelCategoryId,
    editingHotelCategoryId,
    editingHotelCategory,
    isLoading,
    open,
    startEdit,
    close,
  };
};
