import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";
import { useIncomeWithdraw } from "service/incomeWithdraw";

export const useIncomeWithdrawListSearchParams = () => {
  const [params, setParams] = useUrlQueryParams([
    "status",
    "path",
    "userId",
    "shopType",
    "shopId",
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

export const useIncomeWithdrawListQueryKey = () => {
  const [params] = useIncomeWithdrawListSearchParams();
  return ["goods_shop_income_withdraw_list", params];
};

export const useIncomeWithdrawModal = () => {
  const [{ editingIncomeWithdrawId }, setEditingIncomeWithdrawId] =
    useUrlQueryParams(["editingIncomeWithdrawId"]);
  const setUrlParams = useSetUrlSearchParams();
  const {
    data: withdrawInfo,
    isLoading,
    error,
  } = useIncomeWithdraw(Number(editingIncomeWithdrawId));

  const open = useCallback(
    (id: number) =>
      setEditingIncomeWithdrawId({ editingIncomeWithdrawId: `${id}` }),
    [setEditingIncomeWithdrawId]
  );
  const close = useCallback(
    () => setUrlParams({ editingIncomeWithdrawId: "" }),
    [setUrlParams]
  );

  return {
    withdrawModalOpen: !!editingIncomeWithdrawId,
    editingIncomeWithdrawId,
    withdrawInfo,
    isLoading,
    error,
    open,
    close,
  };
};

export const useRejectModal = () => {
  const [{ rejectWithdrawId }, setRejectWithdrawId] = useUrlQueryParams([
    "rejectWithdrawId",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    (id: number) => setRejectWithdrawId({ rejectWithdrawId: `${id}` }),
    [setRejectWithdrawId]
  );
  const close = useCallback(
    () => setUrlParams({ rejectWithdrawId: "" }),
    [setUrlParams]
  );

  return {
    rejectModalOpen: !!rejectWithdrawId,
    rejectWithdrawId,
    open,
    close,
  };
};
