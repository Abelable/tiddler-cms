import styled from "@emotion/styled";
import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";

const breadcrumbNameMap: { [key: string]: string } = {
  "/auth": "权限管理",
  "/auth/role_list": "角色列表",
  "/auth/admin_list": "管理员列表",
  "/user_list": "用户列表",
};

export const NavigationBar = () => {
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });
  return (
    <Wrap>
      <div>当前位置：</div>
      <Breadcrumb>{extraBreadcrumbItems}</Breadcrumb>
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 0.4rem;
`;
