import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";
import { useCommissionWithdraw } from "service/commissionWithdraw";

export const useCommissionWithdrawListSearchParams = () => {
  const [params, setParams] = useUrlQueryParams([
    "status",
    "scene",
    "path",
    "userId",
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

export const useCommissionWithdrawListQueryKey = () => {
  const [params] = useCommissionWithdrawListSearchParams();
  return ["commission_withdraw_list", params];
};

export const useCommissionWithdrawModal = () => {
  const [{ editingCommissionWithdrawId }, setEditingCommissionWithdrawId] =
    useUrlQueryParams(["editingCommissionWithdrawId"]);
  const setUrlParams = useSetUrlSearchParams();
  const {
    data: withdrawInfo,
    isLoading,
    error,
  } = useCommissionWithdraw(Number(editingCommissionWithdrawId));

  const open = useCallback(
    (id: number) =>
      setEditingCommissionWithdrawId({ editingCommissionWithdrawId: `${id}` }),
    [setEditingCommissionWithdrawId]
  );
  const close = useCallback(
    () => setUrlParams({ editingCommissionWithdrawId: "" }),
    [setUrlParams]
  );

  return {
    withdrawModalOpen: !!editingCommissionWithdrawId,
    editingCommissionWithdrawId,
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
