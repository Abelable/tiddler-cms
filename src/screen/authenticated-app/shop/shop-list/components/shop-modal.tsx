import { Descriptions, Drawer, Image } from "antd";
import { ErrorBox, ModalLoading } from "components/lib";
import dayjs from "dayjs";
import { useShopModal } from "../util";
import { ShopCategoryOption } from "types/shopCategory";

export const ShopModal = ({
  shopCategoryOptions,
}: {
  shopCategoryOptions: ShopCategoryOption[];
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
          <Descriptions
            style={{ marginBottom: "3.2rem" }}
            title="基础信息"
            size={"small"}
            column={2}
          >
            <Descriptions.Item label="ID">{editingShop?.id}</Descriptions.Item>
            <Descriptions.Item label="商家类型">
              {editingShop?.type === 1 ? "个人" : "企业"}
            </Descriptions.Item>
            <Descriptions.Item label="入驻时间">
              {dayjs(editingShop?.createdAt).format("YYYY-MM-DD HH:mm:ss")}
            </Descriptions.Item>
            <Descriptions.Item label="更新时间">
              {dayjs(editingShop?.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
            </Descriptions.Item>
          </Descriptions>
          {editingShop?.type === 1 ? (
            <>
              <Descriptions
                style={{ marginBottom: "3.2rem" }}
                title="个人信息"
                size={"small"}
                column={2}
              >
                <Descriptions.Item label="姓名">
                  {editingShop?.name}
                </Descriptions.Item>
              </Descriptions>
              <Descriptions
                style={{ marginBottom: "3.2rem" }}
                title="联系方式"
                size={"small"}
                column={2}
              ></Descriptions>
            </>
          ) : (
            <>
              <Descriptions
                style={{ marginBottom: "3.2rem" }}
                title="企业信息"
                size={"small"}
                column={2}
              ></Descriptions>
              <Descriptions
                style={{ marginBottom: "3.2rem" }}
                title="法人信息"
                size={"small"}
                column={2}
              >
                <Descriptions.Item label="姓名">
                  {editingShop?.name}
                </Descriptions.Item>
              </Descriptions>
            </>
          )}
          <Descriptions
            style={{ marginBottom: "3.2rem" }}
            title="银行信息"
            size={"small"}
            column={2}
          ></Descriptions>
          <Descriptions
            style={{ marginBottom: "3.2rem" }}
            title="店铺信息"
            size={"small"}
            column={2}
          ></Descriptions>
        </>
      )}
    </Drawer>
  );
};
