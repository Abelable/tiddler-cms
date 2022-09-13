import { useAuth } from "context/auth-context";
import * as auth from "./auth";
import qs from "qs";
import { useCallback } from "react";
import { message } from "antd";

const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  token?: string;
  data?: object;
  formData?: FormData;
}

export const http = async (
  endpoint: string,
  { token, data, formData, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      timestamp: initTimestamp(),
      nonce: initNonce(),
      ...headers,
    } as any,
    ...customConfig,
  };

  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    if (formData) {
      config.body = formData;
    } else {
      config.headers["Content-Type"] = "application/json";
      config.body = JSON.stringify(data || {});
    }
  }
  return window.fetch(`${apiUrl}${endpoint}`, config).then(async (response) => {
    if (response.ok) {
      if (config.headers.responseType === "arraybuffer") {
        if (response.headers.get("X-Error-Message")) {
          message.error(
            `${decodeURI(response.headers.get("X-Error-Message") as string)}`
          );
          return;
        }
        const result = await response.blob();
        const url = window.URL.createObjectURL(result);
        const link = document.createElement("a");
        link.style.display = "none";
        link.href = url;
        link.setAttribute(
          "download",
          `${decodeURI(response.headers.get("X-File-Name") as string)}`
        );
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        const result = await response.json();
        if (result.code === 401) {
          await auth.logout();
          window.location.reload();
          return Promise.reject({ message: "请重新登录" });
        }
        if ([200, 201, 204].includes(result.code)) return result.data;
        else return Promise.reject(result);
      }
    } else return Promise.reject({ message: response.statusText });
  });
};

export const useHttp = () => {
  const { token } = useAuth();
  return useCallback(
    (...[endpoint, config]: Parameters<typeof http>) =>
      http(endpoint, { ...config, token }),
    [token]
  );
};

export const initTimestamp = () =>
  Math.round(new Date().getTime() / 1000).toString();

export const initNonce = () => {
  const chars = [
    ...["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    ...["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M"],
    ...["N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
    ...["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m"],
    ...["n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
  ];
  let nonce = "";
  for (let i = 0; i < 16; i++) {
    const id = parseInt(`${Math.random() * 61}`);
    nonce += chars[id];
  }
  return nonce;
};
