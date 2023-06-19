import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import {
  useAddConfig,
  useApprovedConfig,
  useDeleteConfig,
  useEditConfig,
  useRejectConfig,
} from "./use-optimistic-options";
import { cleanObject } from "utils/index";
import type {
  Ticket,
  TicketListResult,
  TicketListSearchParams,
  TicketDetail,
} from "types/ticket";

export const useTicketList = (params: Partial<TicketListSearchParams>) => {
  const client = useHttp();
  return useQuery<TicketListResult>(["ticket_list", params], () =>
    client("ticket/list", { data: params, method: "POST" })
  );
};

export const useTicket = (id: number) => {
  const client = useHttp();
  return useQuery<Partial<TicketDetail>>(
    ["ticket", { id }],
    () => client(`ticket/detail`, { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useApprovedTicket = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("ticket/up", {
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
      client("ticket/reject", {
        data,
        method: "POST",
      }),
    useRejectConfig(queryKey)
  );
};

export const useAddTicket = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Ticket>) =>
      client("ticket/add", {
        data: cleanObject(params),
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditTicket = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Ticket>) =>
      client("ticket/edit", {
        data: cleanObject(params),
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteTicket = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("ticket/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};
