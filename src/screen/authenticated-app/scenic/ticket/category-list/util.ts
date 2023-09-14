import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";
import { useScenicTicketCategory } from "service/scenicTicketCategory";

export const useScenicTicketCategoriesSearchParams = () => {
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

export const useScenicTicketCategoriesQueryKey = () => {
  const [params] = useScenicTicketCategoriesSearchParams();
  return ["scenic_ticket_categories", params];
};

export const useScenicTicketCategoryModal = () => {
  const [{ scenicTicketCategoryCreate }, setScenicTicketCategoryModalOpen] =
    useUrlQueryParams(["scenicTicketCategoryCreate"]);
  const [{ editingScenicTicketCategoryId }, setEditingScenicTicketCategoryId] =
    useUrlQueryParams(["editingScenicTicketCategoryId"]);
  const setUrlParams = useSetUrlSearchParams();
  const { data: editingScenicTicketCategory, isLoading } =
    useScenicTicketCategory(Number(editingScenicTicketCategoryId));

  const open = useCallback(
    () =>
      setScenicTicketCategoryModalOpen({ scenicTicketCategoryCreate: true }),
    [setScenicTicketCategoryModalOpen]
  );
  const startEdit = useCallback(
    (id: number) =>
      setEditingScenicTicketCategoryId({
        editingScenicTicketCategoryId: `${id}`,
      }),
    [setEditingScenicTicketCategoryId]
  );
  const close = useCallback(
    () =>
      setUrlParams({
        scenicTicketCategoryCreate: "",
        editingScenicTicketCategoryId: "",
      }),
    [setUrlParams]
  );

  return {
    scenicTicketCategoryModalOpen:
      scenicTicketCategoryCreate === "true" || !!editingScenicTicketCategoryId,
    editingScenicTicketCategoryId,
    editingScenicTicketCategory,
    isLoading,
    open,
    startEdit,
    close,
  };
};
