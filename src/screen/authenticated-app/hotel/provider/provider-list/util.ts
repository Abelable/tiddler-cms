import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";
import { useProvider } from "service/hotelProvider";

export const useProvidersSearchParams = () => {
  const [params, setParams] = useUrlQueryParams([
    "status",
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

export const useProvidersQueryKey = () => {
  const [params] = useProvidersSearchParams();
  return ["hotel_providers", params];
};

export const useProviderModal = () => {
  const [{ editingProviderId }, setEditingProviderId] = useUrlQueryParams([
    "editingProviderId",
  ]);
  const setUrlParams = useSetUrlSearchParams();
  const {
    data: editingProvider,
    isLoading,
    error,
  } = useProvider(Number(editingProviderId));

  const open = useCallback(
    (id: number) => setEditingProviderId({ editingProviderId: `${id}` }),
    [setEditingProviderId]
  );
  const close = useCallback(
    () => setUrlParams({ merchantCreate: "", editingProviderId: "" }),
    [setUrlParams]
  );

  return {
    merchantModalOpen: !!editingProviderId,
    editingProviderId,
    editingProvider,
    isLoading,
    error,
    open,
    close,
  };
};

export const useRejectModal = () => {
  const [{ rejectProviderId }, setRejectProviderId] = useUrlQueryParams([
    "rejectProviderId",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    (id: number) => setRejectProviderId({ rejectProviderId: `${id}` }),
    [setRejectProviderId]
  );
  const close = useCallback(
    () => setUrlParams({ rejectProviderId: "" }),
    [setUrlParams]
  );

  return {
    rejectModalOpen: !!rejectProviderId,
    rejectProviderId,
    open,
    close,
  };
};
