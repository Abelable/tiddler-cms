import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import type { Role, RolesResult, RolesSearchParams } from "types/role";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";
import { cleanObject } from "utils/index";
import { RoleOption } from "../types/role";

export const useRoles = (params: Partial<RolesSearchParams>) => {
  const client = useHttp();
  return useQuery<RolesResult>(["roles", params], () =>
    client("/admin/role/list", { data: params, method: "POST" })
  );
};

export const useRole = (id: number) => {
  const client = useHttp();
  return useQuery<Partial<Role>>(
    ["role", { id }],
    () => client(`/admin/role/detail`, { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useAddRole = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Role>) =>
      client("/admin/role/add", {
        data: cleanObject(params),
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditRole = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Role>) =>
      client("/admin/role/edit", {
        data: cleanObject(params),
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteRole = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("/admin/role/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useRoleOptions = () => {
  const client = useHttp();
  return useQuery<RoleOption[]>(["role_options"], () =>
    client("/admin/role/options")
  );
};
