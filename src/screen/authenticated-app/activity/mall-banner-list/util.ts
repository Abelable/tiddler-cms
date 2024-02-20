import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";
import { useMallBanner } from "service/mallBanner";

export const useMallBannerListSearchParams = () => {
  const [params, setParams] = useUrlQueryParams([
    "status",
    "scene",
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

export const useMallBannerListQueryKey = () => {
  const [params] = useMallBannerListSearchParams();
  return ["mall_banner_list", params];
};

export const useMallBannerModal = () => {
  const [{ mallBannerCreate }, setMallBannerModalOpen] = useUrlQueryParams([
    "mallBannerCreate",
  ]);
  const [{ editingMallBannerId }, setEditingMallBannerId] = useUrlQueryParams([
    "editingMallBannerId",
  ]);
  const setUrlParams = useSetUrlSearchParams();
  const { data: editingMallBanner, isLoading } = useMallBanner(
    Number(editingMallBannerId)
  );

  const open = useCallback(
    () => setMallBannerModalOpen({ mallBannerCreate: true }),
    [setMallBannerModalOpen]
  );
  const startEdit = useCallback(
    (id: number) => setEditingMallBannerId({ editingMallBannerId: `${id}` }),
    [setEditingMallBannerId]
  );
  const close = useCallback(
    () => setUrlParams({ mallBannerCreate: "", editingMallBannerId: "" }),
    [setUrlParams]
  );

  return {
    mallBannerModalOpen: mallBannerCreate === "true" || !!editingMallBannerId,
    editingMallBannerId,
    editingMallBanner,
    isLoading,
    open,
    startEdit,
    close,
  };
};
