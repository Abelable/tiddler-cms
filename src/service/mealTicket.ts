import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import {
  useApproveConfig,
  useDeleteConfig,
  useRejectConfig,
} from "./use-optimistic-options";
import type {
  TicketListResult,
  TicketListSearchParams,
  TicketDetail,
} from "types/mealTicket";

export const useTicketList = (params: Partial<TicketListSearchParams>) => {
  const client = useHttp();
  return useQuery<TicketListResult>(["meal_ticket_list", params], () =>
    client("catering/meal_ticket/list", { data: params, method: "POST" })
  );
};

export const useTicket = (id: number) => {
  const client = useHttp();
  return useQuery<Partial<TicketDetail>>(
    ["meal_ticket", { id }],
    () => client(`catering/meal_ticket/detail`, { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useApproveTicket = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("catering/meal_ticket/approve", {
        data: { id },
        method: "POST",
      }),
    useApproveConfig(queryKey)
  );
};

export const useRejectTicket = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (data: { id: number; failureReason: string }) =>
      client("catering/meal_ticket/reject", {
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
      client("catering/meal_ticket/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};
