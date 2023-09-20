import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";
import { useCateringProvider } from "service/cateringProvider";

export const useCateringProvidersSearchParams = () => {
  const [params, setParams] = useUrlQueryParams([
    "status",
    "type",
    "name",
    "mobile",
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

export const useCateringProvidersQueryKey = () => {
  const [params] = useCateringProvidersSearchParams();
  return ["catering_providers", params];
};

export const useCateringProviderModal = () => {
  const [{ editingCateringProviderId }, setEditingCateringProviderId] =
    useUrlQueryParams(["editingCateringProviderId"]);
  const setUrlParams = useSetUrlSearchParams();
  const {
    data: editingCateringProvider,
    isLoading,
    error,
  } = useCateringProvider(Number(editingCateringProviderId));

  const open = useCallback(
    (id: number) =>
      setEditingCateringProviderId({ editingCateringProviderId: `${id}` }),
    [setEditingCateringProviderId]
  );
  const close = useCallback(
    () =>
      setUrlParams({
        cateringProviderCreate: "",
        editingCateringProviderId: "",
      }),
    [setUrlParams]
  );

  return {
    cateringProviderModalOpen: !!editingCateringProviderId,
    editingCateringProviderId,
    editingCateringProvider,
    isLoading,
    error,
    open,
    close,
  };
};

export const useRejectModal = () => {
  const [{ rejectCateringProviderId }, setRejectCateringProviderId] =
    useUrlQueryParams(["rejectCateringProviderId"]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    (id: number) =>
      setRejectCateringProviderId({ rejectCateringProviderId: `${id}` }),
    [setRejectCateringProviderId]
  );
  const close = useCallback(
    () => setUrlParams({ rejectCateringProviderId: "" }),
    [setUrlParams]
  );

  return {
    rejectModalOpen: !!rejectCateringProviderId,
    rejectCateringProviderId,
    open,
    close,
  };
};
