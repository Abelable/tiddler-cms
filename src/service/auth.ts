import { useMutation, useQuery } from "react-query";
import { http, useHttp } from "./http";
import { cleanObject } from "utils";
import { useEditAdminBaseInfoConfig } from "./use-optimistic-options";

import type { AuthForm, AdminInfo } from "types/auth";

const localStorageKey = "__auth_provider_token__";
const localStoragePermissionKey = "__auth_provider_permission__";

export const getToken = () => window.localStorage.getItem(localStorageKey);
export const removeToken = () =>
  window.localStorage.removeItem(localStorageKey);

export const getPermission = (): string[] => {
  const permissionStorage = window.localStorage.getItem(
    localStoragePermissionKey
  );
  return permissionStorage ? JSON.parse(permissionStorage) : [];
};
export const removePermission = () =>
  window.localStorage.removeItem(localStoragePermissionKey);

export const login = async (form: AuthForm) => {
  const { token, permission } = await http("auth/login", {
    method: "POST",
    data: form,
  });
  window.localStorage.setItem(localStorageKey, token);
  window.localStorage.setItem(localStoragePermissionKey, permission);
  return { token, permission: JSON.parse(permission) };
};

export const logout = async () => {
  await http("auth/logout", { token: getToken() as string });
  removeToken();
  removePermission();
};

export const refreshToken = async () => {
  const token = await http("auth/token_refresh");
  window.localStorage.setItem(localStorageKey, token);
};

export const useAdminInfo = () => {
  const client = useHttp();
  return useQuery<AdminInfo>(["admin_info"], () => client("auth/base_info"));
};

export const resetPassword = async ({
  password,
  newPassword,
}: {
  password: string;
  newPassword: string;
}) => {
  await http("auth/reset_password", {
    token: getToken() as string,
    data: { password, newPassword },
    method: "POST",
  });
};

export const useUpdateAdminInfo = () => {
  const client = useHttp();
  return useMutation(
    (params: Partial<AdminInfo>) =>
      client("auth/update_base_info", {
        data: cleanObject(params),
        method: "POST",
      }),
    useEditAdminBaseInfoConfig(["admin_info"])
  );
};
