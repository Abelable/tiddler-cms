import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";
import { useGiftType } from "service/giftType";

export const useGiftTypeListSearchParams = () => {
  const [params, setParams] = useUrlQueryParams(["page", "limit"]);
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

export const useGiftTypeListQueryKey = () => {
  const [params] = useGiftTypeListSearchParams();
  return ["gift_type_list", params];
};

export const useGiftTypeModal = () => {
  const [{ giftTypeCreate }, setGiftTypeModalOpen] = useUrlQueryParams([
    "giftTypeCreate",
  ]);
  const [{ editingGiftTypeId }, setEditingGiftTypeId] = useUrlQueryParams([
    "editingGiftTypeId",
  ]);
  const setUrlParams = useSetUrlSearchParams();
  const { data: editingGiftType, isLoading } = useGiftType(
    Number(editingGiftTypeId)
  );

  const open = useCallback(
    () => setGiftTypeModalOpen({ giftTypeCreate: true }),
    [setGiftTypeModalOpen]
  );
  const startEdit = useCallback(
    (id: number) => setEditingGiftTypeId({ editingGiftTypeId: `${id}` }),
    [setEditingGiftTypeId]
  );
  const close = useCallback(
    () => setUrlParams({ giftTypeCreate: "", editingGiftTypeId: "" }),
    [setUrlParams]
  );

  return {
    giftTypeModalOpen: giftTypeCreate === "true" || !!editingGiftTypeId,
    editingGiftTypeId,
    editingGiftType,
    isLoading,
    open,
    startEdit,
    close,
  };
};
