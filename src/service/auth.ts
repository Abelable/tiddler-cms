import { useQuery } from "react-query";
import { AuthForm, UserInfo } from "types/auth";
import { http, useHttp } from "./http";

const localStorageKey = "__auth_provider_token__";

export const getToken = () => window.localStorage.getItem(localStorageKey);

export const login = async (form: AuthForm) => {
  const token = await http("/admin/auth/login", {
    method: "POST",
    data: form,
  });
  window.localStorage.setItem(localStorageKey, token);
  return token;
};

export const logout = async () =>
  window.localStorage.removeItem(localStorageKey);

export const useUserInfo = () => {
  const client = useHttp();
  return useQuery<UserInfo>(["useInfo"], () => client("/api/v1/admin/auth/me"));
};
