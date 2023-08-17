import styled from "@emotion/styled";
import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";

const breadcrumbNameMap: { [key: string]: string } = {
  "/auth": "权限管理",
  "/auth/role_list": "角色列表",
  "/auth/admin_list": "管理员列表",
  "/user_list": "用户列表",
  "/merchant": "商家管理",
  "/merchant/list": "商家列表",
  "/merchant/order_list": "入驻订单列表",
  "/shop": "店铺管理",
  "/shop/category_list": "店铺分类",
  "/shop/list": "店铺列表",
  "/goods": "商品管理",
  "/goods/express_list": "快递列表",
  "/goods/category_list": "商品分类",
  "/goods/list": "商品列表",
  "/scenic_spot": "景区管理",
  "/scenic_spot/category_list": "景区分类",
  "/scenic_spot/list": "景区列表",
  "/scenic_provider": "景区服务商管理",
  "/scenic_provider/list": "服务商列表",
  "/scenic_provider/order_list": "入驻订单列表",
  "/scenic_provider/shop_list": "店铺列表",
  "/scenic_provider/scenic_list": "景点申请列表",
  "/scenic_ticket": "门票管理",
  "/scenic_ticket/category_list": "门票分类",
  "/scenic_ticket/list": "门票列表",
  "/hotel": "酒店管理",
  "/hotel/category_list": "酒店分类",
  "/hotel/list": "酒店列表",
  "/hotel/list/room_type_list": "房型列表",
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
