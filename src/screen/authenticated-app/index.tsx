import { useState } from "react";
import { useRouteType } from "utils/url";
import { useAuth } from "context/auth-context";
import styled from "@emotion/styled";
import { useUserInfo } from "service/auth";
import { HashRouter as Router, Link } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import { Avatar, Button, Dropdown, Layout, Menu, MenuProps } from "antd";
import { NavigationBar } from "components/navigation-bar";

import { RoleList } from "./admin/role-list";
import { AdminList } from "./admin/admin-list";
import { UserList } from "./user-list";
import { MerchantList } from "./merchant/merchant-list/index";
import { MerchantOrderList } from "./merchant/merchant-order-list/index";
import { ShopCategoryList } from "./shop/category-list/index";
import { ShopList } from "./shop/shop-list";
import { ExpressList } from "./goods/express-list";

import {
  LockOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  CaretDownOutlined,
  KeyOutlined,
  TeamOutlined,
  ShopOutlined,
  ApartmentOutlined,
  FileDoneOutlined,
  ShoppingOutlined,
  CarOutlined,
} from "@ant-design/icons";
import logo from "assets/images/logo.png";
import { UserInfo } from "types/auth";
import { Row } from "components/lib";

export const AuthenticatedApp = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { data: userInfo } = useUserInfo();
  const { logout } = useAuth();

  return (
    <Router>
      <Layout style={{ height: "100vh", overflow: "hidden" }}>
        <MenuSider collapsed={collapsed} />
        <Layout>
          <Header>
            <Row>
              <Trigger collapsed={collapsed} setCollapsed={setCollapsed} />
              <NavigationBar />
            </Row>
            <User userInfo={userInfo} logout={logout} />
          </Header>
          <Content>
            <Routes>
              <Route path="auth/role_list" element={<RoleList />} />
              <Route path="auth/admin_list" element={<AdminList />} />
              <Route path="user_list" element={<UserList />} />
              <Route path="merchant/list" element={<MerchantList />} />
              <Route
                path="merchant/order_list"
                element={<MerchantOrderList />}
              />
              <Route path="shop/category_list" element={<ShopCategoryList />} />
              <Route path="shop/list" element={<ShopList />} />
              <Route path="goods/express_list" element={<ExpressList />} />
              <Route
                path={"*"}
                element={<Navigate to={"user_list"} replace={true} />}
              />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

const MenuSider = ({ collapsed }: { collapsed: boolean }) => {
  const { defaultOpenKey, selectedKey } = useRouteType();

  const items: MenuProps["items"] = [
    {
      label: <Link to={"user_list"}>????????????</Link>,
      key: "user_list",
      icon: <TeamOutlined />,
    },
    {
      label: "????????????",
      key: "auth",
      icon: <LockOutlined />,
      children: [
        {
          label: <Link to={"auth/role_list"}>????????????</Link>,
          key: "role_list",
          icon: <KeyOutlined />,
        },
        {
          label: <Link to={"auth/admin_list"}>???????????????</Link>,
          key: "admin_list",
          icon: <TeamOutlined />,
        },
      ],
    },
    {
      label: "????????????",
      key: "merchant",
      icon: <TeamOutlined />,
      children: [
        {
          label: <Link to={"merchant/list"}>????????????</Link>,
          key: "merchant_list",
          icon: <TeamOutlined />,
        },
        {
          label: <Link to={"merchant/order_list"}>????????????</Link>,
          key: "merchant_order_list",
          icon: <FileDoneOutlined />,
        },
      ],
    },
    {
      label: "????????????",
      key: "shop",
      icon: <ShopOutlined />,
      children: [
        {
          label: <Link to={"shop/category_list"}>????????????</Link>,
          key: "shop_category_list",
          icon: <ApartmentOutlined />,
        },
        {
          label: <Link to={"shop/list"}>????????????</Link>,
          key: "shop_list",
          icon: <ShopOutlined />,
        },
      ],
    },
    {
      label: "????????????",
      key: "goods",
      icon: <ShoppingOutlined />,
      children: [
        {
          label: <Link to={"goods/express_list"}>????????????</Link>,
          key: "goods_express_list",
          icon: <CarOutlined />,
        },
      ],
    },
  ];

  return (
    <Layout.Sider trigger={null} collapsible collapsed={collapsed}>
      <Link to={"/"}>
        <Logo collapsed={collapsed}>
          <LogoImg src={logo} />
          <div>?????????????????????</div>
        </Logo>
      </Link>
      <Menu
        theme="dark"
        mode="inline"
        defaultOpenKeys={[defaultOpenKey]}
        selectedKeys={[selectedKey]}
        items={items}
      />
    </Layout.Sider>
  );
};

interface Collapsed {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Trigger = ({ collapsed, setCollapsed }: Collapsed) => {
  return (
    <div onClick={() => setCollapsed(!collapsed)}>
      {collapsed ? <Unfold /> : <Fold />}
    </div>
  );
};

const User = ({
  userInfo,
  logout,
}: {
  userInfo: UserInfo | undefined;
  logout: () => void;
}) => {
  const items: MenuProps["items"] = [
    {
      label: (
        <Button type={"link"} onClick={logout}>
          ??????
        </Button>
      ),
      key: "logout",
    },
  ];

  return (
    <Row gap={1} style={{ cursor: "pointer" }}>
      <Avatar src={userInfo?.avatar} />
      <div>{userInfo?.nickname}</div>
      <Dropdown overlay={<Menu items={items} />}>
        <CaretDownOutlined style={{ fontSize: "1.2rem" }} />
      </Dropdown>
    </Row>
  );
};

const Logo = styled.div<{ collapsed: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.6rem;
  padding-left: ${(props) => (props.collapsed ? "2.6rem" : "1.6rem")};
  transition: padding-left 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  cursor: pointer;
  > div {
    margin-left: 1rem;
    flex: 1;
    height: 2.2rem;
    color: #fff;
    overflow: hidden;
    opacity: ${(props) => (props.collapsed ? 0 : 1)};
    transition: opacity 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
`;

const LogoImg = styled.img<{ size?: number }>`
  width: ${(props) => (props.size ? props.size + "rem" : "2.8rem")};
  height: ${(props) => (props.size ? props.size + "rem" : "2.8rem")};
  border-radius: 50%;
  cursor: pointer;
`;

const Header = styled(Layout.Header)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 0;
  padding-right: 2.4rem;
  background: #fff;
  box-shadow: 0 2px 4px rgb(0 21 41 / 8%);
  z-index: 10;
`;

const Unfold = styled(MenuUnfoldOutlined)`
  padding: 0 2.4rem;
  font-size: 1.8rem;
  line-height: 6.4rem;
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    color: #1890ff;
  }
`;
const Fold = Unfold.withComponent(MenuFoldOutlined);

const Content = styled(Layout.Content)`
  height: 100%;
`;
