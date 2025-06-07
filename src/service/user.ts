import { QueryKey, useMutation, useQuery } from "react-query";
import { useHttp } from "./http";
import { useDeleteConfig, useEditConfig } from "./use-optimistic-options";
import type {
  User,
  UserOption,
  UsersResult,
  UsersSearchParams,
} from "types/user";
import { cleanObject } from "utils";

export const useUsers = (params: Partial<UsersSearchParams>) => {
  const client = useHttp();
  return useQuery<UsersResult>(["users", params], () =>
    client("user/list", { data: params, method: "POST" })
  );
};

export const useUser = (id: number) => {
  const client = useHttp();
  return useQuery<Partial<User>>(
    ["user", { id }],
    () => client(`user/detail`, { data: { id } }),
    {
      enabled: !!id,
    }
  );
};

export const useEditUser = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<User>) =>
      client("user/edit", {
        data: cleanObject(params),
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteUser = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (id: number) =>
      client("user/delete", {
        data: { id },
        method: "POST",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useUserOptions = () => {
  const client = useHttp();
  return useQuery<UserOption[]>(["user_options"], () => client("user/options"));
};

export const useUserNormalOptions = () => {
  const client = useHttp();
  return useQuery<UserOption[]>(["normal_user_options"], () =>
    client("user/normal_options")
  );
};

export const useBindSuperior = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (data: { userId: number; superiorId: number }) =>
      client("user/bind_superior", {
        data,
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteSuperior = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (data: { userId: number; superiorId: number }) =>
      client("user/delete_superior", {
        data,
        method: "POST",
      }),
    useEditConfig(queryKey)
  );
};
