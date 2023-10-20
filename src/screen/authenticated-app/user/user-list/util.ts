import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";
import { useUser } from "service/user";

export const useUsersSearchParams = () => {
  const [params, setParams] = useUrlQueryParams([
    "nickname",
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

export const useUsersQueryKey = () => {
  const [params] = useUsersSearchParams();
  return ["users", params];
};

export const useUserModal = () => {
  const [{ editingUserId }, setEditingUserId] = useUrlQueryParams([
    "editingUserId",
  ]);
  const setUrlParams = useSetUrlSearchParams();
  const {
    data: editingUser,
    isLoading,
    error,
  } = useUser(Number(editingUserId));

  const open = useCallback(
    (id: number) => setEditingUserId({ editingUserId: `${id}` }),
    [setEditingUserId]
  );
  const close = useCallback(
    () => setUrlParams({ userCreate: "", editingUserId: "" }),
    [setUrlParams]
  );

  return {
    userModalOpen: !!editingUserId,
    editingUserId,
    editingUser,
    isLoading,
    error,
    open,
    close,
  };
};
