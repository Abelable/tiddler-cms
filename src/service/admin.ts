import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";
import { cleanObject } from "utils/index";
import type { Admin, AdminsResult, AdminsSearchParams } from "types/admin";

export const useAdmins = (params: Partial<AdminsSearchParams>) => {
  const client = useHttp();
  return useQuery<AdminsResult>(["admins", params], () =>
    client("/admin/list", { data: params, method: "POST" })
  );
};

export const useAdmin = (id: number) => {
  const client = useHttp();
  return useQuery<Partial<Admin>>(
    ["admin", { id }],
    () => client(`/admin/detail`, { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useAddAdmin = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Admin>) =>
      client("/admin/add", {
        data: cleanObject(params),
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useEditAdmin = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Admin>) =>
      client("/admin/edit", {
        data: cleanObject(params),
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteAdmin = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("/admin/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};
