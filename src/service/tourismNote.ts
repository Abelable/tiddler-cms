import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";
import { cleanObject } from "utils/index";

import type {
  TourismNote,
  TourismNoteListResult,
  TourismNoteListSearchParams,
} from "types/tourismNote";

export const useTourismNoteList = (
  params: Partial<TourismNoteListSearchParams>
) => {
  const client = useHttp();
  return useQuery<TourismNoteListResult>(["tourism_note_list", params], () =>
    client("media/tourism_note/list", { data: params, method: "POST" })
  );
};

export const useTourismNote = (id: number) => {
  const client = useHttp();
  return useQuery<Partial<TourismNote>>(
    ["tourism_note", { id }],
    () => client(`media/tourism_note/detail`, { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useAddTourismNote = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<TourismNote>) =>
      client("media/tourism_note/add", {
        data: cleanObject(params),
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditTourismNote = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<TourismNote>) =>
      client("media/tourism_note/edit", {
        data: cleanObject(params),
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useEditViews = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id, views }: { id: number; views: number }) =>
      client("media/tourism_note/edit_views", {
        data: { id, views },
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteTourismNote = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("media/tourism_note/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};
