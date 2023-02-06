import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";
import { useGoods } from "service/goods";

export const useGoodsListSearchParams = () => {
  const [params, setParams] = useUrlQueryParams([
    "nickname",
    "account",
    "roleId",
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

export const useGoodsListQueryKey = () => {
  const [params] = useGoodsListSearchParams();
  return ["goods_list", params];
};

export const useGoodsModal = () => {
  const [{ editingGoodsId }, setEditingGoodsId] = useUrlQueryParams([
    "editingGoodsId",
  ]);
  const setUrlParams = useSetUrlSearchParams();
  const {
    data: editingGoods,
    isLoading,
    error,
  } = useGoods(Number(editingGoodsId));

  const open = useCallback(
    (id: number) => setEditingGoodsId({ editingGoodsId: `${id}` }),
    [setEditingGoodsId]
  );
  const close = useCallback(
    () => setUrlParams({ goodsCreate: "", editingGoodsId: "" }),
    [setUrlParams]
  );

  return {
    goodsModalOpen: !!editingGoodsId,
    editingGoodsId,
    editingGoods,
    isLoading,
    error,
    open,
    close,
  };
};

export const useRejectModal = () => {
  const [{ rejectGoodsId }, setRejectGoodsId] = useUrlQueryParams([
    "rejectGoodsId",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    (id: number) => setRejectGoodsId({ rejectGoodsId: `${id}` }),
    [setRejectGoodsId]
  );
  const close = useCallback(
    () => setUrlParams({ rejectGoodsId: "" }),
    [setUrlParams]
  );

  return {
    rejectModalOpen: !!rejectGoodsId,
    rejectGoodsId,
    open,
    close,
  };
};
