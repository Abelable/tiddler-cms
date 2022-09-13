import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./auth-context";
import { ConfigProvider } from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");

export const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <AuthProvider>
        <ConfigProvider locale={zhCN}>{children}</ConfigProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};
