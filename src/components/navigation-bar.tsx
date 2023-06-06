import styled from "@emotion/styled";
import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";

const breadcrumbNameMap: { [key: string]: string } = {
  "/auth": "权限管理",
  "/auth/role_list": "角色列表",
  "/auth/admin_list": "管理员列表",
  "/user_list": "用户列表",
  "/merchant": "商家管理",
  "/shop": "店铺管理",
  "/shop/merchant_list": "商家列表",
  "/shop/merchant_order_list": "订单列表",
  "/shop/category_list": "店铺分类",
  "/shop/list": "店铺列表",
  "/goods": "商品管理",
  "/goods/express_list": "快递列表",
  "/goods/category_list": "商品分类",
  "/goods/list": "商品列表",
  "/scenic_spot": "景点管理",
  "/scenic_spot/category_list": "景点分类",
  "/scenic_spot/list": "景点列表",
  "/scenic_spot/provider_list": "服务商列表",
  "/scenic_spot/provider_order_list": "订单列表",
  "/scenic_spot/shop_list": "店铺列表",
  "/scenic_ticket": "门票管理",
  "/scenic_ticket/category_list": "门票分类",
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
