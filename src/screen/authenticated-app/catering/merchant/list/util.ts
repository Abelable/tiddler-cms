import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";
import { useCateringMerchant } from "service/cateringMerchant";

export const useCateringMerchantsSearchParams = () => {
  const [params, setParams] = useUrlQueryParams([
    "status",
    "type",
    "name",
    "mobile",
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

export const useCateringMerchantsQueryKey = () => {
  const [params] = useCateringMerchantsSearchParams();
  return ["catering_merchant_list", params];
};

export const useCateringMerchantModal = () => {
  const [{ editingCateringMerchantId }, setEditingCateringMerchantId] =
    useUrlQueryParams(["editingCateringMerchantId"]);
  const setUrlParams = useSetUrlSearchParams();
  const {
    data: editingCateringMerchant,
    isLoading,
    error,
  } = useCateringMerchant(Number(editingCateringMerchantId));

  const open = useCallback(
    (id: number) =>
      setEditingCateringMerchantId({ editingCateringMerchantId: `${id}` }),
    [setEditingCateringMerchantId]
  );
  const close = useCallback(
    () =>
      setUrlParams({
        cateringMerchantCreate: "",
        editingCateringMerchantId: "",
      }),
    [setUrlParams]
  );

  return {
    cateringMerchantModalOpen: !!editingCateringMerchantId,
    editingCateringMerchantId,
    editingCateringMerchant,
    isLoading,
    error,
    open,
    close,
  };
};

export const useRejectModal = () => {
  const [{ rejectCateringMerchantId }, setRejectCateringMerchantId] =
    useUrlQueryParams(["rejectCateringMerchantId"]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    (id: number) =>
      setRejectCateringMerchantId({ rejectCateringMerchantId: `${id}` }),
    [setRejectCateringMerchantId]
  );
  const close = useCallback(
    () => setUrlParams({ rejectCateringMerchantId: "" }),
    [setUrlParams]
  );

  return {
    rejectModalOpen: !!rejectCateringMerchantId,
    rejectCateringMerchantId,
    open,
    close,
  };
};
