import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import {
  useApprovedConfig,
  useDeleteConfig,
  useRejectConfig,
} from "./use-optimistic-options";
import type {
  TicketListResult,
  TicketListSearchParams,
  TicketDetail,
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

export const useApprovedTicket = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("scenic/ticket/approve", {
        data: { id },
        method: "POST",
      }),
    useApprovedConfig(queryKey)
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
