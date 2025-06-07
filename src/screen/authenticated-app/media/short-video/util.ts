import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";
import { useShortVideo } from "service/shortVideo";

export const useShortVideoListSearchParams = () => {
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

export const useShortVideoListQueryKey = () => {
  const [params] = useShortVideoListSearchParams();
  return ["short_video_list", params];
};

export const useShortVideoModal = () => {
  const [{ shortVideoCreate }, setAdminModalOpen] = useUrlQueryParams([
    "shortVideoCreate",
  ]);
  const [{ editingShortVideoId }, setEditingShortVideoId] = useUrlQueryParams([
    "editingShortVideoId",
  ]);
  const setUrlParams = useSetUrlSearchParams();
  const {
    data: editingShortVideo,
    isLoading,
    error,
  } = useShortVideo(Number(editingShortVideoId));

  const open = useCallback(
    () => setAdminModalOpen({ shortVideoCreate: true }),
    [setAdminModalOpen]
  );
  const startEdit = useCallback(
    (id: number) => setEditingShortVideoId({ editingShortVideoId: `${id}` }),
    [setEditingShortVideoId]
  );
  const close = useCallback(
    () => setUrlParams({ shortVideoCreate: "", editingShortVideoId: "" }),
    [setUrlParams]
  );

  return {
    shortVideoModalOpen: shortVideoCreate === "true" || !!editingShortVideoId,
    editingShortVideoId,
    editingShortVideo,
    isLoading,
    error,
    open,
    startEdit,
    close,
  };
};
