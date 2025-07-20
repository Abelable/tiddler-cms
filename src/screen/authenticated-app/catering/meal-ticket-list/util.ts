import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";
import { useTicket } from "service/mealTicket";

export const useTicketListSearchParams = () => {
  const [params, setParams] = useUrlQueryParams([
    "name",
    "restaurantId",
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

export const useTicketListQueryKey = () => {
  const [params] = useTicketListSearchParams();
  return ["meal_ticket_list", params];
};

export const useTicketModal = () => {
  const [{ editingTicketId }, setEditingTicketId] = useUrlQueryParams([
    "editingTicketId",
  ]);
  const setUrlParams = useSetUrlSearchParams();
  const {
    data: editingTicket,
    isLoading,
    error,
  } = useTicket(Number(editingTicketId));

  const open = useCallback(
    (id: number) => setEditingTicketId({ editingTicketId: `${id}` }),
    [setEditingTicketId]
  );
  const close = useCallback(
    () => setUrlParams({ ticketCreate: "", editingTicketId: "" }),
    [setUrlParams]
  );

  return {
    ticketModalOpen: !!editingTicketId,
    editingTicketId,
    editingTicket,
    isLoading,
    error,
    open,
    close,
  };
};

export const useApproveModal = () => {
  const [{ approveTicketId }, setApproveTicketId] = useUrlQueryParams([
    "approveTicketId",
  ]);
  const setUrlParams = useSetUrlSearchParams();
  const {
    data: editingTicket,
    isLoading,
    error,
  } = useTicket(Number(approveTicketId));

  const open = useCallback(
    (id: number) => setApproveTicketId({ approveTicketId: `${id}` }),
    [setApproveTicketId]
  );
  const close = useCallback(
    () => setUrlParams({ approveTicketId: "" }),
    [setUrlParams]
  );

  return {
    approveModalOpen: !!approveTicketId,
    approveTicketId,
    editingTicket,
    isLoading,
    error,
    open,
    close,
  };
};

export const useRejectModal = () => {
  const [{ rejectTicketId }, setRejectTicketId] = useUrlQueryParams([
    "rejectTicketId",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    (id: number) => setRejectTicketId({ rejectTicketId: `${id}` }),
    [setRejectTicketId]
  );
  const close = useCallback(
    () => setUrlParams({ rejectTicketId: "" }),
    [setUrlParams]
  );

  return {
    rejectModalOpen: !!rejectTicketId,
    rejectTicketId,
    open,
    close,
  };
};
