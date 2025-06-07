import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";
import { useTourismNote } from "service/tourismNote";

export const useTourismNoteListSearchParams = () => {
  const [params, setParams] = useUrlQueryParams([
    "title",
    "userId",
    "scenicId",
    "hotelId",
    "restaurantId",
    "goodsId",
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

export const useTourismNoteListQueryKey = () => {
  const [params] = useTourismNoteListSearchParams();
  return ["tourism_note_list", params];
};

export const useTourismNoteModal = () => {
  const [{ tourismNoteCreate }, setAdminModalOpen] = useUrlQueryParams([
    "tourismNoteCreate",
  ]);
  const [{ editingTourismNoteId }, setEditingTourismNoteId] = useUrlQueryParams(
    ["editingTourismNoteId"]
  );
  const setUrlParams = useSetUrlSearchParams();
  const {
    data: editingTourismNote,
    isLoading,
    error,
  } = useTourismNote(Number(editingTourismNoteId));

  const open = useCallback(
    () => setAdminModalOpen({ tourismNoteCreate: true }),
    [setAdminModalOpen]
  );
  const startEdit = useCallback(
    (id: number) => setEditingTourismNoteId({ editingTourismNoteId: `${id}` }),
    [setEditingTourismNoteId]
  );
  const close = useCallback(
    () => setUrlParams({ tourismNoteCreate: "", editingTourismNoteId: "" }),
    [setUrlParams]
  );

  return {
    tourismNoteModalOpen:
      tourismNoteCreate === "true" || !!editingTourismNoteId,
    editingTourismNoteId,
    editingTourismNote,
    isLoading,
    error,
    open,
    startEdit,
    close,
  };
};
