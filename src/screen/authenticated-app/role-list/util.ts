import { useSetUrlSearchParams, useUrlQueryParams } from "utils/url";
import { useCallback, useMemo } from "react";
import { useRole } from "service/role";

export const useRolesSearchParams = () => {
  const [params, setParams] = useUrlQueryParams(["page", "limit"]);
  return [
    useMemo(
      () => ({
        page: Number(params.page) || 1,
        limit: Number(params.limit) || 10,
      }),
      [params]
    ),
    setParams,
  ] as const;
};

export const useRolesQueryKey = () => {
  const [params] = useRolesSearchParams();
  return ["roles", params];
};

export const useRoleModal = () => {
  const [{ roleCreate }, setRoleModalOpen] = useUrlQueryParams(["roleCreate"]);
  const [{ editingRoleId }, setEditingRoleId] = useUrlQueryParams([
    "editingRoleId",
  ]);
  const setUrlParams = useSetUrlSearchParams();
  const { data: editingRole, isLoading } = useRole(Number(editingRoleId));

  const open = useCallback(
    () => setRoleModalOpen({ roleCreate: true }),
    [setRoleModalOpen]
  );
  const startEdit = useCallback(
    (id: number) => setEditingRoleId({ editingRoleId: `${id}` }),
    [setEditingRoleId]
  );
  const close = useCallback(
    () => setUrlParams({ RoleCreate: "", editingRoleId: "" }),
    [setUrlParams]
  );

  return {
    roleModalOpen: roleCreate === "true" || !!editingRoleId,
    editingRoleId,
    editingRole,
    isLoading,
    open,
    startEdit,
    close,
  };
};
