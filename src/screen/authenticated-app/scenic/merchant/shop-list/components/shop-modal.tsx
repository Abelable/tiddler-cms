import { Descriptions, Drawer, Image, Avatar } from "antd";
import { ErrorBox, ModalLoading } from "components/lib";
import { UserOutlined } from "@ant-design/icons";

import dayjs from "dayjs";
import { useShopModal } from "../util";

import type { Option } from "types/common";

export const ShopModal = ({
  shopTypeOptions,
}: {
  shopTypeOptions: Option[];
}) => {
  const { close, shopModalOpen, editingShop, error, isLoading } =
    useShopModal();

  return (
    <Drawer
      forceRender={true}
      title="店铺详情"
      size={"large"}
      onClose={close}
      open={shopModalOpen}
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
    >
      <ErrorBox error={error} />
      {isLoading ? (
        <ModalLoading />
      ) : (
        <>
          <Descriptions size={"small"} column={1} bordered>
            <Descriptions.Item label="ID">{editingShop?.id}</Descriptions.Item>
            <Descriptions.Item label="店铺名称">
              {editingShop?.name}
            </Descriptions.Item>
            <Descriptions.Item label="店铺状态">
              {editingShop?.status === 0 ? (
                <span style={{ color: "#f50" }}>未支付保证金</span>
              ) : (
                <span style={{ color: "#87d068", cursor: "pointer" }}>
                  已支付保证金
                </span>
              )}
            </Descriptions.Item>
            <Descriptions.Item label="店铺类型">
              {
                shopTypeOptions.find((item) => item.value === editingShop?.type)
                  ?.text
              }
            </Descriptions.Item>
            <Descriptions.Item label="店铺头像">
              <Avatar
                src={editingShop?.logo}
                icon={<UserOutlined />}
                size="small"
              />
            </Descriptions.Item>
            {editingShop?.cover ? (
              <Descriptions.Item label="店铺封面">
                <Image width={132} height={86} src={editingShop?.cover} />
              </Descriptions.Item>
            ) : (
              <></>
            )}

            <Descriptions.Item label="注册时间">
              {dayjs(editingShop?.createdAt).format("YYYY-MM-DD HH:mm:ss")}
            </Descriptions.Item>
            <Descriptions.Item label="更新时间">
              {dayjs(editingShop?.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
            </Descriptions.Item>
          </Descriptions>
        </>
      )}
    </Drawer>
  );
};
