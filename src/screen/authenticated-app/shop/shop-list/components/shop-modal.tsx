import { Descriptions, Drawer, Image, Avatar } from "antd";
import { ErrorBox, ModalLoading } from "components/lib";
import { UserOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useShopModal } from "../util";
import { CategoryOption } from "types/category";

export const ShopModal = ({
  shopCategoryOptions,
}: {
  shopCategoryOptions: CategoryOption[];
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
      bodyStyle={{ paddingBottom: 80 }}
    >
      <ErrorBox error={error} />
      {isLoading ? (
        <ModalLoading />
      ) : (
        <>
          <Descriptions title="基础信息" size={"small"} column={2}>
            <Descriptions.Item label="ID">{editingShop?.id}</Descriptions.Item>
            <Descriptions.Item label="店铺名称">
              {editingShop?.name}
            </Descriptions.Item>
            <Descriptions.Item label="店铺分类">
              {
                shopCategoryOptions.find(
                  (item) => item.id === editingShop?.categoryId
                )?.name
              }
            </Descriptions.Item>
            <Descriptions.Item label="商家类型">
              {editingShop?.type === 1 ? "个人" : "企业"}
            </Descriptions.Item>
            <Descriptions.Item label="店铺头像">
              <Avatar
                src={editingShop?.avatar}
                icon={<UserOutlined />}
                size="small"
              />
            </Descriptions.Item>
            <Descriptions.Item label="店铺封面">
              <Image width={132} height={86} src={editingShop?.cover} />
            </Descriptions.Item>
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
