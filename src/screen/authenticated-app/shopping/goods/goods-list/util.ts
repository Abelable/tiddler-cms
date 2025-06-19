import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";
import { useGoods } from "service/goods";

export const useGoodsListSearchParams = () => {
  const [params, setParams] = useUrlQueryParams([
    "name",
    "shopCategoryId",
    "categoryId",
    "status",
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
  const [{ goodsCreate }, setGoodsModalOpen] = useUrlQueryParams([
    "goodsCreate",
  ]);
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
    () => setGoodsModalOpen({ goodsCreate: true }),
    [setGoodsModalOpen]
  );
  const startEdit = useCallback(
    (id: number) => setEditingGoodsId({ editingGoodsId: `${id}` }),
    [setEditingGoodsId]
  );
  const close = useCallback(
    () => setUrlParams({ goodsCreate: "", editingGoodsId: "" }),
    [setUrlParams]
  );

  return {
    goodsModalOpen: goodsCreate === "true" || !!editingGoodsId,
    editingGoodsId,
    editingGoods,
    isLoading,
    error,
    open,
    startEdit,
    close,
  };
};

export const useGoodsDetailModal = () => {
  const [{ curGoodsId }, setCurGoodsId] = useUrlQueryParams(["curGoodsId"]);
  const setUrlParams = useSetUrlSearchParams();
  const { data: editingGoods, isLoading, error } = useGoods(Number(curGoodsId));

  const open = useCallback(
    (id: number) => setCurGoodsId({ curGoodsId: `${id}` }),
    [setCurGoodsId]
  );
  const close = useCallback(
    () => setUrlParams({ goodsCreate: "", curGoodsId: "" }),
    [setUrlParams]
  );

  return {
    goodsModalOpen: !!curGoodsId,
    curGoodsId,
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

export const useApproveModal = () => {
  const [{ approveGoodsId }, setApproveGoodsId] = useUrlQueryParams([
    "approveGoodsId",
  ]);
  const setUrlParams = useSetUrlSearchParams();
  const {
    data: editingGoods,
    isLoading,
    error,
  } = useGoods(Number(approveGoodsId));

  const open = useCallback(
    (id: number) => setApproveGoodsId({ approveGoodsId: `${id}` }),
    [setApproveGoodsId]
  );
  const close = useCallback(
    () => setUrlParams({ approveGoodsId: "" }),
    [setUrlParams]
  );

  return {
    approveModalOpen: !!approveGoodsId,
    approveGoodsId,
    editingGoods,
    isLoading,
    error,
    open,
    close,
  };
};
