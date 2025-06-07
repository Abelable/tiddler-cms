import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";
import { usePromoter } from "service/promoter";

export const usePromoterListSearchParams = () => {
  const [params, setParams] = useUrlQueryParams([
    "nickname",
    "mobile",
    "level",
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

export const usePromoterListQueryKey = () => {
  const [params] = usePromoterListSearchParams();
  return ["promoter_list", params];
};

export const usePromoterModal = () => {
  const [{ promoterCreate }, setPromoterModalOpen] = useUrlQueryParams([
    "promoterCreate",
  ]);
  const [{ editingPromoterId }, setEditingPromoterId] = useUrlQueryParams([
    "editingPromoterId",
  ]);
  const setUrlParams = useSetUrlSearchParams();
  const {
    data: editingPromoter,
    isLoading,
    error,
  } = usePromoter(Number(editingPromoterId));

  const open = useCallback(
    () => setPromoterModalOpen({ promoterCreate: true }),
    [setPromoterModalOpen]
  );
  const startEdit = useCallback(
    (id: number) => setEditingPromoterId({ editingPromoterId: `${id}` }),
    [setEditingPromoterId]
  );
  const close = useCallback(
    () => setUrlParams({ promoterCreate: "", editingPromoterId: "" }),
    [setUrlParams]
  );

  return {
    promoterModalOpen: promoterCreate === "true" || !!editingPromoterId,
    editingPromoterId,
    editingPromoter,
    isLoading,
    error,
    open,
    startEdit,
    close,
  };
};
