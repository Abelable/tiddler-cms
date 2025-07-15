import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";
import { useRoom } from "service/hotelRoom";

export const useRoomListSearchParams = () => {
  const [params, setParams] = useUrlQueryParams([
    "hotelId",
    "typeId",
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

export const useRoomListQueryKey = () => {
  const [params] = useRoomListSearchParams();
  return ["hotel_room_list", params];
};

export const useRoomModal = () => {
  const [{ editingRoomId }, setEditingRoomId] = useUrlQueryParams([
    "editingRoomId",
  ]);
  const setUrlParams = useSetUrlSearchParams();
  const {
    data: editingRoom,
    isLoading,
    error,
  } = useRoom(Number(editingRoomId));

  const open = useCallback(
    (id: number) => setEditingRoomId({ editingRoomId: `${id}` }),
    [setEditingRoomId]
  );
  const close = useCallback(
    () => setUrlParams({ roomCreate: "", editingRoomId: "" }),
    [setUrlParams]
  );

  return {
    roomModalOpen: !!editingRoomId,
    editingRoomId,
    editingRoom,
    isLoading,
    error,
    open,
    close,
  };
};

export const useApproveModal = () => {
  const [{ approveRoomId }, setApproveRoomId] = useUrlQueryParams([
    "approveRoomId",
  ]);
  const setUrlParams = useSetUrlSearchParams();
  const {
    data: editingRoom,
    isLoading,
    error,
  } = useRoom(Number(approveRoomId));

  const open = useCallback(
    (id: number) => setApproveRoomId({ approveRoomId: `${id}` }),
    [setApproveRoomId]
  );
  const close = useCallback(
    () => setUrlParams({ approveRoomId: "" }),
    [setUrlParams]
  );

  return {
    approveModalOpen: !!approveRoomId,
    approveRoomId,
    editingRoom,
    isLoading,
    error,
    open,
    close,
  };
};

export const useRejectModal = () => {
  const [{ rejectRoomId }, setRejectRoomId] = useUrlQueryParams([
    "rejectRoomId",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    (id: number) => setRejectRoomId({ rejectRoomId: `${id}` }),
    [setRejectRoomId]
  );
  const close = useCallback(
    () => setUrlParams({ rejectRoomId: "" }),
    [setUrlParams]
  );

  return {
    rejectModalOpen: !!rejectRoomId,
    rejectRoomId,
    open,
    close,
  };
};
