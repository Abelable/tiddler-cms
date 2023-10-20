import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";
import { useAuthInfo } from "service/authInfo";

export const useAuthInfoListSearchParams = () => {
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

export const useAuthInfoListQueryKey = () => {
  const [params] = useAuthInfoListSearchParams();
  return ["auth_info_list", params];
};

export const useAuthInfoModal = () => {
  const [{ editingAuthInfoId }, setEditingAuthInfoId] = useUrlQueryParams([
    "editingAuthInfoId",
  ]);
  const setUrlParams = useSetUrlSearchParams();
  const {
    data: editingAuthInfo,
    isLoading,
    error,
  } = useAuthInfo(Number(editingAuthInfoId));

  const open = useCallback(
    (id: number) => setEditingAuthInfoId({ editingAuthInfoId: `${id}` }),
    [setEditingAuthInfoId]
  );
  const close = useCallback(
    () => setUrlParams({ merchantCreate: "", editingAuthInfoId: "" }),
    [setUrlParams]
  );

  return {
    merchantModalOpen: !!editingAuthInfoId,
    editingAuthInfoId,
    editingAuthInfo,
    isLoading,
    error,
    open,
    close,
  };
};

export const useRejectModal = () => {
  const [{ rejectAuthInfoId }, setRejectAuthInfoId] = useUrlQueryParams([
    "rejectAuthInfoId",
  ]);
  const setUrlParams = useSetUrlSearchParams();

  const open = useCallback(
    (id: number) => setRejectAuthInfoId({ rejectAuthInfoId: `${id}` }),
    [setRejectAuthInfoId]
  );
  const close = useCallback(
    () => setUrlParams({ rejectAuthInfoId: "" }),
    [setUrlParams]
  );

  return {
    rejectModalOpen: !!rejectAuthInfoId,
    rejectAuthInfoId,
    open,
    close,
  };
};
