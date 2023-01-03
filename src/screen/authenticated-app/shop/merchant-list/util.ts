import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";
import { useMerchant } from "service/merchant";

export const useMerchantsSearchParams = () => {
  const [params, setParams] = useUrlQueryParams([
    "nickname",
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

export const useMerchantsQueryKey = () => {
  const [params] = useMerchantsSearchParams();
  return ["merchants", params];
};

export const useMerchantModal = () => {
  const [{ editingMerchantId }, setEditingMerchantId] = useUrlQueryParams([
    "editingMerchantId",
  ]);
  const setUrlParams = useSetUrlSearchParams();
  const {
    data: editingMerchant,
    isLoading,
    error,
  } = useMerchant(Number(editingMerchantId));

  const open = useCallback(
    (id: number) => setEditingMerchantId({ editingMerchantId: `${id}` }),
    [setEditingMerchantId]
  );
  const close = useCallback(
    () => setUrlParams({ merchantCreate: "", editingMerchantId: "" }),
    [setUrlParams]
  );

  return {
    merchantModalOpen: !!editingMerchantId,
    editingMerchantId,
    editingMerchant,
    isLoading,
    error,
    open,
    close,
  };
};
