import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import {
  useApproveConfig,
  useDeleteConfig,
  useRejectWithdrawConfig,
} from "./use-optimistic-options";
import type {
  CommissionWithdrawDetail,
  CommissionWithdrawListResult,
  CommissionWithdrawListSearchParams,
} from "types/commissionWithdraw";

export const useCommissionWithdrawList = (
  params: Partial<CommissionWithdrawListSearchParams>
) => {
  const client = useHttp();
  return useQuery<CommissionWithdrawListResult>(
    ["commission_withdraw_list", params],
    () =>
      client("finance/commission_withdraw/list", {
        data: params,
        method: "POST",
      })
  );
};

export const useCommissionWithdraw = (id: number) => {
  const client = useHttp();
  return useQuery<Partial<CommissionWithdrawDetail>>(
    ["finance/commission_withdraw/detail", { id }],
    () => client("commission_withdraw_detail", { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useApprovedCommissionWithdraw = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("finance/commission_withdraw/approved", {
        data: { id },
        method: "POST",
      }),
    useApproveConfig(queryKey)
  );
};

export const useRejectCommissionWithdraw = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (data: { id: number; failureReason: string }) =>
      client("finance/commission_withdraw/reject", {
        data,
        method: "POST",
      }),
    useRejectWithdrawConfig(queryKey)
  );
};

export const useDeleteCommissionWithdraw = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("finance/commission_withdraw/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useCommissionWithdrawPendingCount = () => {
  const client = useHttp();
  return useQuery(["commission_withdraw_pending_count"], () =>
    client("finance/commission_withdraw/pending_count")
  );
};
