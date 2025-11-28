import { Form, Input, Modal, Tree } from "antd";
import { ErrorBox, ModalLoading } from "components/lib";

import { Key, useEffect, useState } from "react";
import { useForm } from "antd/lib/form/Form";
import { useAddRole, useEditRole } from "service/role";
import { useRoleModal, useRolesQueryKey } from "../util";

import type { DataNode } from "antd/es/tree";

const treeData: DataNode[] = [
  {
    title: "用户管理",
    key: "user",
    children: [
      {
        title: "用户列表",
        key: "user_list",
      },
      {
        title: "实名认证",
        key: "user_auth_info_list",
      },
    ],
  },
  {
    title: "家乡代言",
    key: "team",
    children: [
      {
        title: "好物类型",
        key: "team_gift_type_list",
      },
      {
        title: "家乡好物",
        key: "team_gift_list",
      },
      {
        title: "家乡代言人",
        key: "team_promoter_list",
      },
    ],
  },
  {
    title: "活动管理",
    key: "activity",
    children: [
      {
        title: "头图列表",
        key: "activity_banner_list",
      },
      {
        title: "奖励任务",
        key: "activity_task_list",
      },
    ],
  },
  {
    title: "主题专区",
    key: "theme",
    children: [
      {
        title: "网红打卡地",
        key: "theme_hot_scenic",
      },
      {
        title: "游湖登岛",
        key: "theme_lake_trip",
      },
      {
        title: "环湖骑行",
        key: "theme_lake_cycle",
        children: [
          {
            title: "沿途景点",
            key: "theme_lake_cycle_scenic_list",
          },
          {
            title: "骑行攻略",
            key: "theme_lake_cycle_media_list",
          },
        ],
      },
      {
        title: "夜游千岛湖",
        key: "theme_night_trip",
      },
      {
        title: "明星同游",
        key: "theme_star_trip",
      },
      {
        title: "湖畔民宿",
        key: "theme_lake_homestay",
      },
    ],
  },
  {
    title: "游记管理",
    key: "media",
    children: [
      {
        title: "最佳游记",
        key: "media_top",
      },
      {
        title: "视频游记",
        key: "media_short_video",
      },
      {
        title: "图文游记",
        key: "media_tourism_note",
      },
    ],
  },
  {
    title: "景点模块",
    key: "scenic",
    children: [
      {
        title: "景点分类",
        key: "scenic_category_list",
      },
      {
        title: "景点列表",
        key: "scenic_list",
      },
      {
        title: "商家管理",
        key: "scenic_merchant",
        children: [
          {
            title: "商家列表",
            key: "scenic_merchant_list",
          },
          {
            title: "店铺列表",
            key: "scenic_merchant_shop_list",
          },
          {
            title: "景点申请",
            key: "scenic_merchant_scenic_apply",
          },
        ],
      },
      {
        title: "门票管理",
        key: "scenic_ticket",
        children: [
          {
            title: "门票分类",
            key: "scenic_ticket_category_list",
          },
          {
            title: "门票列表",
            key: "scenic_ticket_list",
          },
        ],
      },
    ],
  },
  {
    title: "酒店模块",
    key: "hotel",
    children: [
      {
        title: "酒店管理",
        key: "hotel_store",
        children: [
          {
            title: "酒店分类",
            key: "hotel_store_category_list",
          },
          {
            title: "酒店列表",
            key: "hotel_store_list",
          },
          {
            title: "房间列表",
            key: "hotel_store_room_list",
          },
        ],
      },
      {
        title: "商家管理",
        key: "hotel_merchant",
        children: [
          {
            title: "商家列表",
            key: "hotel_merchant_list",
          },
          {
            title: "店铺列表",
            key: "hotel_merchant_shop_list",
          },
          {
            title: "酒店申请",
            key: "hotel_merchant_hotel_apply",
          },
        ],
      },
    ],
  },
  {
    title: "餐饮模块",
    key: "catering",
    children: [
      {
        title: "商家管理",
        key: "catering_merchant",
        children: [
          {
            title: "商家列表",
            key: "catering_merchant_list",
          },
          {
            title: "门店申请",
            key: "catering_merchant_restaurant_apply",
          },
        ],
      },
      {
        title: "门店管理",
        key: "catering_restaurant",
        children: [
          {
            title: "门店分类",
            key: "catering_restaurant_category_list",
          },
          {
            title: "门店列表",
            key: "catering_restaurant_list",
          },
        ],
      },
      {
        title: "餐券列表",
        key: "catering_meal_ticket_list",
      },
      {
        title: "套餐列表",
        key: "catering_set_meal_list",
      },
    ],
  },
  {
    title: "电商模块",
    key: "shopping",
    children: [
      {
        title: "商家列表",
        key: "shopping_merchant_list",
      },
      {
        title: "快递列表",
        key: "shopping_express_list",
      },
      {
        title: "门店管理",
        key: "shopping_shop",
        children: [
          {
            title: "店铺分类",
            key: "shopping_shop_category_list",
          },
          {
            title: "店铺列表",
            key: "shopping_shop_list",
          },
        ],
      },
      {
        title: "自营管理",
        key: "self_support",
        children: [
          {
            title: "运费模板",
            key: "shopping_self_support_freight_template_list",
          },
          {
            title: "提货地点",
            key: "shopping_self_support_pickup_address_list",
          },
          {
            title: "退货地址",
            key: "shopping_self_support_refund_address_list",
          },
        ],
      },
      {
        title: "商品管理",
        key: "shopping_goods",
        children: [
          {
            title: "商品分类",
            key: "shopping_goods_category_list",
          },
          {
            title: "商品列表",
            key: "shopping_goods_list",
          },
        ],
      },
      {
        title: "订单列表",
        key: "shopping_order_list",
      },
    ],
  },
  {
    title: "权限管理",
    key: "auth",
    children: [
      {
        title: "角色列表",
        key: "auth_role_list",
      },
      {
        title: "管理员列表",
        key: "auth_admin_list",
      },
    ],
  },
  {
    title: "系统设置",
    key: "setting",
    children: [
      {
        title: "评价标签",
        key: "evaluation_tag",
      },
      {
        title: "投诉选项",
        key: "complaint_option",
      },
    ],
  },
];

export const RoleModal = () => {
  const [form] = useForm();
  const { roleModalOpen, editingRoleId, editingRole, isLoading, close } =
    useRoleModal();
  const [defaultCheckedKeys, setDefaultCheckedKeys] = useState<Key[]>([]);

  const useMutateRole = editingRoleId ? useEditRole : useAddRole;
  const {
    mutateAsync,
    isLoading: mutateLoading,
    error,
  } = useMutateRole(useRolesQueryKey());

  useEffect(() => {
    if (editingRole) {
      const { permission = "", ...rest } = editingRole;
      setDefaultCheckedKeys(JSON.parse(permission) as Key[]);
      form.setFieldsValue({ permission: JSON.parse(permission), ...rest });
    }
  }, [editingRole, form]);

  const confirm = () => {
    form.validateFields().then(async () => {
      const { permission, ...rest } = form.getFieldsValue();
      await mutateAsync({
        ...editingRole,
        permission: JSON.stringify(permission),
        ...rest,
      });
      closeModal();
    });
  };

  const closeModal = () => {
    form.resetFields();
    setDefaultCheckedKeys([]);
    close();
  };

  return (
    <Modal
      forceRender={true}
      title={editingRoleId ? "编辑角色" : "新增角色"}
      open={roleModalOpen}
      confirmLoading={mutateLoading}
      onOk={confirm}
      onCancel={closeModal}
    >
      <ErrorBox error={error} />
      {isLoading ? (
        <ModalLoading />
      ) : (
        <Form form={form} layout="vertical">
          <Form.Item
            label={"角色名称"}
            name={"name"}
            rules={[{ required: true, message: "请输入角色名称" }]}
          >
            <Input placeholder={"请输入角色名称"} />
          </Form.Item>
          <Form.Item
            label={"角色描述"}
            name={"desc"}
            rules={[{ required: true, message: "请输入角色描述" }]}
          >
            <Input placeholder={"请输入角色描述"} />
          </Form.Item>
          {!editingRoleId || (editingRoleId && defaultCheckedKeys.length) ? (
            <Form.Item
              label={"角色权限"}
              name={"permission"}
              rules={[{ required: true, message: "请选择角色权限" }]}
            >
              <Tree
                checkable
                defaultCheckedKeys={defaultCheckedKeys}
                treeData={treeData}
                onCheck={(checkedKeys) => {
                  form.setFieldsValue({ permission: checkedKeys });
                }}
              />
            </Form.Item>
          ) : (
            <></>
          )}
        </Form>
      )}
    </Modal>
  );
};
