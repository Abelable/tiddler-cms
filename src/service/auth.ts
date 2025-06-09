import { useMutation, useQuery } from "react-query";
import { http, useHttp } from "./http";
import { cleanObject } from "utils";
import { useEditAdminBaseInfoConfig } from "./use-optimistic-options";

import type { AuthForm, AdminInfo } from "types/auth";

const localStorageKey = "__auth_provider_token__";

export const getToken = () => window.localStorage.getItem(localStorageKey);
export const removeToken = () =>
  window.localStorage.removeItem(localStorageKey);

export const login = async (form: AuthForm) => {
  const token = await http("auth/login", {
    method: "POST",
    data: form,
  });
  window.localStorage.setItem(localStorageKey, token);
  return token;
};

export const logout = async () => {
  await http("auth/logout", { token: getToken() as string });
  return removeToken();
};

export const refreshToken = async () => {
  const token = await http("auth/token_refresh");
  window.localStorage.setItem(localStorageKey, token);
};

export const useAdminInfo = () => {
  const client = useHttp();
  return useQuery<AdminInfo>(["admin_info"], () => client("auth/me"));
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
