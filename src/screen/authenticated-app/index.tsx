import { useState } from "react";
import { useRouteType } from "utils/url";
import { useAuth } from "context/auth-context";
import styled from "@emotion/styled";
import { useAdminInfo } from "service/auth";
import { HashRouter as Router, Link } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import { Avatar, Dropdown, Layout, Menu, MenuProps } from "antd";
import { NavigationBar } from "components/navigation-bar";

import { RoleList } from "./permission-management/role-list";
import { AdminList } from "./permission-management/admin-list";
import { UserList } from "./user/user-list";
import { AuthInfoList } from "./user/auth-info-list";
import { ShortVideoList } from "./media/short-video";
import { TourismNoteList } from "./media/tourism-note";
import { ScenicCategoryList } from "./scenic/spot/category-list";
import { ScenicList } from "./scenic/spot/spot-list";
import { ScenicProviderList } from "./scenic/provider/provider-list";
import { ScenicShopList } from "./scenic/provider/shop-list";
import { ProviderScenicList } from "./scenic/provider/spot-apply-list";
import { ScenicTicketCategoryList } from "./scenic/ticket/category-list";
import { ScenicTicketList } from "./scenic/ticket/ticket-list";
import { HotelCategoryList } from "./hotel/store/category-list";
import { HotelList } from "./hotel/store/store-list";
import { HotelRoomList } from "./hotel/store/room-list";
import { HotelRoomTypeList } from "./hotel/store/room-type-list";
import { HotelProviderList } from "./hotel/provider/provider-list";
import { HotelShopList } from "./hotel/provider/shop-list";
import { ProviderHotelList } from "./hotel/provider/hotel-apply-list";
import { CateringProviderList } from "./catering/provider/provider-list";
import { ProviderRestaurantList } from "./catering/provider/restaurant-apply-list";
import { RestaurantCategoryList } from "./catering/restaurant/category-list";
import { RestaurantList } from "./catering/restaurant/restaurant-list";
import { MealTicketList } from "./catering/meal-ticket-list";
import { SetMealList } from "./catering/set-meal-list";
import { MallBannerList } from "./activity/mall-banner-list";
import { MerchantList } from "./shopping/merchant-list/index";
import { ShopCategoryList } from "./shopping/shop/category-list/index";
import { ShopList } from "./shopping/shop/shop-list";
import { ExpressList } from "./shopping/express-list";
import { GoodsCategoryList } from "./shopping/goods/category-list";
import { FreightTemplateList } from "./shopping/goods/freight-template-list";
import { GoodsList } from "./shopping/goods/goods-list";
import { GiftTypeList } from "./team/gift-type-list";
import { GiftGoodsList } from "./team/gift-goods-list";
import { PromoterList } from "./team/promoter-list";
import { PersonalCenter } from "./permission-management/personal-center";

import {
  LockOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  MehOutlined,
  TeamOutlined,
  ShopOutlined,
  AppstoreOutlined,
  ShoppingOutlined,
  UnorderedListOutlined,
  FileAddOutlined,
  VerifiedOutlined,
  UserOutlined,
  GiftOutlined,
  PictureOutlined,
  CarOutlined,
  CloudOutlined,
  SendOutlined,
  VideoCameraOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import {
  ExpressIcon,
  ScenicSpotIcon,
  TicketIcon,
  HotelIcon,
  BedIcon,
  CateringIcon,
  CouponIcon,
  SetMealIcon,
} from "assets/icon";
import logo from "assets/images/logo.png";
import { AdminInfo } from "types/auth";
import { Row } from "components/lib";

export const AuthenticatedApp = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { data: adminInfo } = useAdminInfo();
  const { permission, logout } = useAuth();

  return (
    <Router>
      <Layout style={{ height: "100vh", overflow: "hidden" }}>
        <MenuSider permission={permission} collapsed={collapsed} />
        <Layout>
          <Header>
            <Row>
              <Trigger collapsed={collapsed} setCollapsed={setCollapsed} />
              <NavigationBar />
            </Row>
            <Admin adminInfo={adminInfo} logout={logout} />
          </Header>
          <Content>
            <Routes>
              <Route path="user/list" element={<UserList />} />
              <Route path="user/auth_info_list" element={<AuthInfoList />} />
              <Route path="activity/mall_banner" element={<MallBannerList />} />
              <Route path="media/short_video" element={<ShortVideoList />} />
              <Route path="media/tourism_note" element={<TourismNoteList />} />
              <Route
                path="scenic/spot/category_list"
                element={<ScenicCategoryList />}
              />
              <Route path="scenic/spot/list" element={<ScenicList />} />
              <Route
                path="scenic/provider/list"
                element={<ScenicProviderList />}
              />
              <Route
                path="scenic/provider/shop_list"
                element={<ScenicShopList />}
              />
              <Route
                path="scenic/provider/spot_apply"
                element={<ProviderScenicList />}
              />
              <Route
                path="scenic/ticket/category_list"
                element={<ScenicTicketCategoryList />}
              />
              <Route path="scenic/ticket/list" element={<ScenicTicketList />} />
              <Route
                path="hotel/store/category_list"
                element={<HotelCategoryList />}
              />
              <Route path="hotel/store/list" element={<HotelList />} />
              <Route
                path="hotel/store/list/room_type_list"
                element={<HotelRoomTypeList />}
              />
              <Route path="hotel/store/room_list" element={<HotelRoomList />} />
              <Route
                path="hotel/provider/list"
                element={<HotelProviderList />}
              />
              <Route
                path="hotel/provider/shop_list"
                element={<HotelShopList />}
              />
              <Route
                path="hotel/provider/hotel_apply"
                element={<ProviderHotelList />}
              />
              <Route
                path="catering/provider_list"
                element={<CateringProviderList />}
              />
              <Route
                path="catering/provider/list"
                element={<CateringProviderList />}
              />
              <Route
                path="catering/provider/restaurant_apply"
                element={<ProviderRestaurantList />}
              />
              <Route
                path="catering/restaurant/category_list"
                element={<RestaurantCategoryList />}
              />
              <Route
                path="catering/restaurant/list"
                element={<RestaurantList />}
              />
              <Route
                path="catering/meal_ticket_list"
                element={<MealTicketList />}
              />
              <Route path="catering/set_meal_list" element={<SetMealList />} />
              <Route path="shopping/merchant_list" element={<MerchantList />} />
              <Route
                path="shopping/shop/category_list"
                element={<ShopCategoryList />}
              />
              <Route path="shopping/shop/list" element={<ShopList />} />
              <Route path="shopping/express_list" element={<ExpressList />} />
              <Route
                path="shopping/goods/category_list"
                element={<GoodsCategoryList />}
              />
              <Route
                path="shopping/goods/freight_template_list"
                element={<FreightTemplateList />}
              />
              <Route path="shopping/goods/list" element={<GoodsList />} />
              <Route path="team/gift_type_list" element={<GiftTypeList />} />
              <Route path="team/gift_list" element={<GiftGoodsList />} />
              <Route path="team/promoter_list" element={<PromoterList />} />
              <Route path="auth/role_list" element={<RoleList />} />
              <Route path="auth/admin_list" element={<AdminList />} />
              <Route path="auth/personal_center" element={<PersonalCenter />} />
              <Route
                path={"*"}
                element={<Navigate to={"user/list"} replace={true} />}
              />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

const MenuSider = ({
  permission,
  collapsed,
}: {
  permission: string[];
  collapsed: boolean;
}) => {
  const { defaultOpenKey, selectedKey } = useRouteType();

  const items: MenuProps["items"] = [
    {
      label: "用户管理",
      key: "user",
      icon: <UserOutlined />,
      children: [
        {
          label: <Link to={"user/list"}>用户列表</Link>,
          key: "user_list",
          icon: <TeamOutlined />,
        },
        {
          label: <Link to={"user/auth_info_list"}>实名认证</Link>,
          key: "user_auth_info_list",
          icon: <VerifiedOutlined />,
        },
      ],
    },
    {
      label: "家乡代言",
      key: "team",
      icon: <CloudOutlined />,
      children: [
        {
          label: <Link to={"team/gift_type_list"}>好物类型</Link>,
          key: "team_gift_type_list",
          icon: <AppstoreOutlined />,
        },
        {
          label: <Link to={"team/gift_list"}>家乡好物</Link>,
          key: "team_gift_list",
          icon: <ShoppingOutlined />,
        },
        {
          label: <Link to={"team/promoter_list"}>家乡代言人</Link>,
          key: "team_promoter_list",
          icon: <UserOutlined />,
        },
      ],
    },
    {
      label: "活动管理",
      key: "activity",
      icon: <GiftOutlined />,
      children: [
        {
          label: <Link to={"activity/mall_banner"}>商城Banner</Link>,
          key: "activity_mall_banner",
          icon: <PictureOutlined />,
        },
      ],
    },
    {
      label: "游记管理",
      key: "media",
      icon: <SendOutlined />,
      children: [
        {
          label: <Link to={"media/short_video"}>视频游记</Link>,
          key: "media_short_video",
          icon: <VideoCameraOutlined />,
        },
        {
          label: <Link to={"media/tourism_note"}>图文游记</Link>,
          key: "media_tourism_note",
          icon: <PictureOutlined />,
        },
      ],
    },
    {
      label: "景区模块",
      key: "scenic",
      icon: <ScenicSpotIcon />,
      children: [
        {
          label: "景区管理",
          key: "scenic_spot",
          icon: <ScenicSpotIcon />,
          children: [
            {
              label: <Link to={"scenic/spot/category_list"}>景区分类</Link>,
              key: "scenic_spot_category_list",
              icon: <AppstoreOutlined />,
            },
            {
              label: <Link to={"scenic/spot/list"}>景区列表</Link>,
              key: "scenic_spot_list",
              icon: <UnorderedListOutlined />,
            },
          ],
        },
        {
          label: "服务商管理",
          key: "scenic_provider",
          icon: <TeamOutlined />,
          children: [
            {
              label: <Link to={"scenic/provider/list"}>服务商列表</Link>,
              key: "scenic_provider_list",
              icon: <TeamOutlined />,
            },
            {
              label: <Link to={"scenic/provider/shop_list"}>店铺列表</Link>,
              key: "scenic_provider_shop_list",
              icon: <ShopOutlined />,
            },
            {
              label: <Link to={"scenic/provider/spot_apply"}>景区申请</Link>,
              key: "scenic_provider_spot_apply",
              icon: <FileAddOutlined />,
            },
          ],
        },
        {
          label: "门票管理",
          key: "scenic_ticket",
          icon: <TicketIcon />,
          children: [
            {
              label: <Link to={"scenic/ticket/category_list"}>门票分类</Link>,
              key: "scenic_ticket_category_list",
              icon: <AppstoreOutlined />,
            },
            {
              label: <Link to={"scenic/ticket/list"}>门票列表</Link>,
              key: "scenic_ticket_list",
              icon: <UnorderedListOutlined />,
            },
          ],
        },
      ],
    },
    {
      label: "酒店模块",
      key: "hotel",
      icon: <HotelIcon />,
      children: [
        {
          label: "酒店管理",
          key: "hotel_store",
          icon: <HotelIcon />,
          children: [
            {
              label: <Link to={"hotel/store/category_list"}>酒店分类</Link>,
              key: "hotel_store_category_list",
              icon: <AppstoreOutlined />,
            },
            {
              label: <Link to={"hotel/store/list"}>酒店列表</Link>,
              key: "hotel_store_list",
              icon: <HotelIcon />,
            },
            {
              label: <Link to={"hotel/store/room_list"}>房间列表</Link>,
              key: "hotel_store_room_list",
              icon: <BedIcon />,
            },
          ],
        },
        {
          label: "服务商管理",
          key: "hotel_provider",
          icon: <TeamOutlined />,
          children: [
            {
              label: <Link to={"hotel/provider/list"}>服务商列表</Link>,
              key: "hotel_provider_list",
              icon: <TeamOutlined />,
            },
            {
              label: <Link to={"hotel/provider/shop_list"}>店铺列表</Link>,
              key: "hotel_provider_shop_list",
              icon: <ShopOutlined />,
            },
            {
              label: <Link to={"hotel/provider/hotel_apply"}>酒店申请</Link>,
              key: "hotel_provider_hotel_apply",
              icon: <FileAddOutlined />,
            },
          ],
        },
      ],
    },
    {
      label: "餐饮模块",
      key: "catering",
      icon: <CateringIcon />,
      children: [
        {
          label: "服务商管理",
          key: "catering_provider",
          icon: <TeamOutlined />,
          children: [
            {
              label: <Link to={"catering/provider/list"}>服务商列表</Link>,
              key: "catering_provider_list",
              icon: <TeamOutlined />,
            },
            {
              label: (
                <Link to={"catering/provider/restaurant_apply"}>门店申请</Link>
              ),
              key: "catering_provider_restaurant_apply",
              icon: <FileAddOutlined />,
            },
          ],
        },
        {
          label: "门店管理",
          key: "catering_restaurant",
          icon: <ShopOutlined />,
          children: [
            {
              label: (
                <Link to={"catering/restaurant/category_list"}>门店分类</Link>
              ),
              key: "catering_restaurant_category_list",
              icon: <AppstoreOutlined />,
            },
            {
              label: <Link to={"catering/restaurant/list"}>门店列表</Link>,
              key: "catering_restaurant_list",
              icon: <UnorderedListOutlined />,
            },
          ],
        },
        {
          label: <Link to={"catering/meal_ticket_list"}>代金券列表</Link>,
          key: "catering_meal_ticket_list",
          icon: <CouponIcon />,
        },
        {
          label: <Link to={"catering/set_meal_list"}>套餐列表</Link>,
          key: "catering_set_meal_list",
          icon: <SetMealIcon />,
        },
      ],
    },
    {
      label: "电商模块",
      key: "shopping",
      icon: <ShoppingOutlined />,
      children: [
        {
          label: <Link to={"shopping/merchant_list"}>商家列表</Link>,
          key: "shopping_merchant_list",
          icon: <TeamOutlined />,
        },
        {
          label: <Link to={"shopping/express_list"}>快递列表</Link>,
          key: "shopping_express_list",
          icon: <ExpressIcon />,
        },
        {
          label: "店铺管理",
          key: "shopping_shop",
          icon: <ShopOutlined />,
          children: [
            {
              label: <Link to={"shopping/shop/category_list"}>店铺分类</Link>,
              key: "shopping_shop_category_list",
              icon: <AppstoreOutlined />,
            },
            {
              label: <Link to={"shopping/shop/list"}>店铺列表</Link>,
              key: "shopping_shop_list",
              icon: <UnorderedListOutlined />,
            },
          ],
        },
        {
          label: "商品管理",
          key: "shopping_goods",
          icon: <ShoppingOutlined />,
          children: [
            {
              label: <Link to={"shopping/goods/category_list"}>商品分类</Link>,
              key: "shopping_goods_category_list",
              icon: <AppstoreOutlined />,
            },
            {
              label: (
                <Link to={"shopping/goods/freight_template_list"}>
                  运费模板
                </Link>
              ),
              key: "shopping_goods_freight_template_list",
              icon: <CarOutlined />,
            },
            {
              label: <Link to={"shopping/goods/list"}>商品列表</Link>,
              key: "shopping_goods_list",
              icon: <UnorderedListOutlined />,
            },
          ],
        },
      ],
    },
    {
      label: "权限管理",
      key: "auth",
      icon: <LockOutlined />,
      children: [
        {
          label: <Link to={"auth/role_list"}>角色列表</Link>,
          key: "auth_role_list",
          icon: <MehOutlined />,
        },
        {
          label: <Link to={"auth/admin_list"}>管理员列表</Link>,
          key: "auth_admin_list",
          icon: <TeamOutlined />,
        },
      ],
    },
  ]
    .map((item) => {
      if (permission.includes(item.key)) {
        return item;
      } else {
        if (item.children) {
          const children = item.children
            .map((secondItem) => {
              if (permission.includes(secondItem.key)) {
                return secondItem;
              } else {
                if ((secondItem as any).children) {
                  const _children = (secondItem as any).children.filter(
                    (thirdItem: any) => permission.includes(thirdItem.key)
                  );
                  if (_children.length) {
                    return {
                      ...secondItem,
                      children: _children,
                    };
                  } else {
                    return null;
                  }
                } else {
                  return null;
                }
              }
            })
            .filter((item) => !!item);
          if (children.length) {
            return {
              ...item,
              children,
            };
          } else {
            return null;
          }
        } else {
          return null;
        }
      }
    })
    .filter((item) => !!item);

  return (
    <Layout.Sider
      style={{ overflowY: "scroll" }}
      trigger={null}
      collapsible
      collapsed={collapsed}
    >
      <Link to={"/"}>
        <Logo collapsed={collapsed}>
          <LogoImg src={logo} />
          <div>小鱼游系统后台</div>
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

const Admin = ({
  adminInfo,
  logout,
}: {
  adminInfo: AdminInfo | undefined;
  logout: () => void;
}) => {
  const items: MenuProps["items"] = [
    {
      key: "center",
      icon: <UserOutlined />,
      label: <Link to="auth/personal_center">个人中心</Link>,
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "退出登录",
    },
  ];

  const onClick = (event: any) => {
    const { key } = event;
    if (key === "logout") {
      logout();
    }
  };

  return (
    <Dropdown menu={{ items, onClick }}>
      <AdminInfoWrap>
        <Avatar
          style={{ marginRight: "0.8rem", width: "3rem", height: "3rem" }}
          src={adminInfo?.avatar}
        />
        <div>{adminInfo?.nickname}</div>
      </AdminInfoWrap>
    </Dropdown>
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
    color: #fff;
    white-space: nowrap;
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

const AdminInfoWrap = styled.div`
  display: flex;
  align-items: center;
  padding-left: 1.2rem;
  padding-right: 1.6rem;
  height: 4.4rem;
  color: rgba(0, 0, 0, 0.45);
  border-radius: 0.6rem;
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 0.03);
  }
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
