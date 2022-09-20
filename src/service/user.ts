import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import { useDeleteConfig } from "./use-optimistic-options";
import type { User, UsersResult, UsersSearchParams } from "types/user";

export const useUsers = (params: Partial<UsersSearchParams>) => {
  const client = useHttp();
  return useQuery<UsersResult>(["users", params], () =>
    client("/admin/user/list", { data: params, method: "POST" })
  );
};

export const useUser = (id: number) => {
  const client = useHttp();
  return useQuery<Partial<User>>(
    ["user", { id }],
    () => client(`/admin/user/detail`, { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useDeleteUser = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("/admin/user/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};
