import { useCallback, useMemo } from "react";
import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useBanner } from "service/banner";

export const useBannerListSearchParams = () => {
  const [params, setParams] = useUrlQueryParams([
    "position",
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

export const useBannerListQueryKey = () => {
  const [params] = useBannerListSearchParams();
  return ["mall_banner_list", params];
};

export const useBannerModal = () => {
  const [{ bannerCreate }, setBannerModalOpen] = useUrlQueryParams([
    "bannerCreate",
  ]);
  const [{ editingBannerId }, setEditingBannerId] = useUrlQueryParams([
    "editingBannerId",
  ]);
  const setUrlParams = useSetUrlSearchParams();
  const { data: editingBanner, isLoading } = useBanner(Number(editingBannerId));

  const open = useCallback(
    () => setBannerModalOpen({ bannerCreate: true }),
    [setBannerModalOpen]
  );
  const startEdit = useCallback(
    (id: number) => setEditingBannerId({ editingBannerId: `${id}` }),
    [setEditingBannerId]
  );
  const close = useCallback(
    () => setUrlParams({ bannerCreate: "", editingBannerId: "" }),
    [setUrlParams]
  );

  return {
    bannerModalOpen: bannerCreate === "true" || !!editingBannerId,
    editingBannerId,
    editingBanner,
    isLoading,
    open,
    startEdit,
    close,
  };
};
