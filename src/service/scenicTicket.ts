import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import { cleanObject } from "utils";
import {
  useApproveConfig,
  useDeleteConfig,
  useEditConfig,
  useRejectConfig,
} from "./use-optimistic-options";

import type {
  TicketListResult,
  TicketListSearchParams,
  TicketDetail,
  Ticket,
} from "types/scenicTicket";

export const useTicketList = (params: Partial<TicketListSearchParams>) => {
  const client = useHttp();
  return useQuery<TicketListResult>(["scenic_ticket_list", params], () =>
    client("scenic/ticket/list", { data: params, method: "POST" })
  );
};

export const useTicket = (id: number) => {
  const client = useHttp();
  return useQuery<Partial<TicketDetail>>(
    ["scenic_ticket", { id }],
    () => client(`scenic/ticket/detail`, { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useEditTicketCommission = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Ticket>) =>
      client("scenic/ticket/edit_commission", {
        data: cleanObject(params),
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useApproveTicket = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Ticket>) =>
      client("scenic/ticket/approve", {
        data: cleanObject(params),
        method: "POST",
      }),
    useApproveConfig(queryKey)
  );
};

export const useRejectTicket = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (data: { id: number; failureReason: string }) =>
      client("scenic/ticket/reject", {
        data,
        method: "POST",
      }),
    useRejectConfig(queryKey)
  );
};

export const useDeleteTicket = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("scenic/ticket/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};
