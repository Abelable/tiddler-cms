import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";
import { useShop } from "service/shop";

export const useShopsSearchParams = () => {
  const [params, setParams] = useUrlQueryParams(["name", "page", "limit"]);
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

export const useShopsQueryKey = () => {
  const [params] = useShopsSearchParams();
  return ["shops", params];
};

export const useShopModal = () => {
  const [{ editingShopId }, setEditingShopId] = useUrlQueryParams([
    "editingShopId",
  ]);
  const setUrlParams = useSetUrlSearchParams();
  const {
    data: editingShop,
    isLoading,
    error,
  } = useShop(Number(editingShopId));

  const open = useCallback(
    (id: number) => setEditingShopId({ editingShopId: `${id}` }),
    [setEditingShopId]
  );
  const close = useCallback(
    () => setUrlParams({ shopCreate: "", editingShopId: "" }),
    [setUrlParams]
  );

  return {
    shopModalOpen: !!editingShopId,
    editingShopId,
    editingShop,
    isLoading,
    error,
    open,
    close,
  };
};
