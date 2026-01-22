import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import {
  useApproveConfig,
  useDeleteConfig,
  useRejectWithdrawConfig,
} from "./use-optimistic-options";
import type {
  IncomeWithdrawDetail,
  IncomeWithdrawListResult,
  IncomeWithdrawListSearchParams,
} from "types/incomeWithdraw";

export const useIncomeWithdrawList = (
  params: Partial<IncomeWithdrawListSearchParams>
) => {
  const client = useHttp();
  return useQuery<IncomeWithdrawListResult>(
    ["goods_shop_income_withdraw_list", params],
    () =>
      client("finance/income_withdraw/goods/list", {
        data: params,
        method: "POST",
      })
  );
};

export const useIncomeWithdraw = (id: number) => {
  const client = useHttp();
  return useQuery<Partial<IncomeWithdrawDetail>>(
    ["finance/income_withdraw/goods/detail", { id }],
    () => client("goods_shop_income_withdraw_detail", { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useApprovedIncomeWithdraw = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("finance/income_withdraw/goods/approved", {
        data: { id },
        method: "POST",
      }),
    useApproveConfig(queryKey)
  );
};

export const useRejectIncomeWithdraw = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (data: { id: number; failureReason: string }) =>
      client("finance/income_withdraw/goods/reject", {
        data,
        method: "POST",
      }),
    useRejectWithdrawConfig(queryKey)
  );
};

export const useDeleteIncomeWithdraw = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("finance/income_withdraw/goods/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useIncomeWithdrawPendingCount = () => {
  const client = useHttp();
  return useQuery(["goods_shop_income_withdraw_pending_count"], () =>
    client("finance/income_withdraw/goods/pending_count")
  );
};
