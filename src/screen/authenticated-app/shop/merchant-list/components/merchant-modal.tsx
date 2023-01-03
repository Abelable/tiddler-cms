import { Descriptions, Drawer } from "antd";
import { ErrorBox, ModalLoading } from "components/lib";
import dayjs from "dayjs";
import { useMerchantModal } from "../util";

export const MerchantModal = () => {
  const { close, merchantModalOpen, editingMerchant, error, isLoading } =
    useMerchantModal();

  return (
    <Drawer
      forceRender={true}
      title="商家详情"
      size={"large"}
      onClose={close}
      open={merchantModalOpen}
      bodyStyle={{ paddingBottom: 80 }}
    >
      <ErrorBox error={error} />
      {isLoading ? (
        <ModalLoading />
      ) : (
        <>
          <Descriptions title="基础信息" size={"small"} column={3}>
            <Descriptions.Item label="ID">
              {editingMerchant?.id}
            </Descriptions.Item>
            <Descriptions.Item label="联系人/法人姓名">
              {editingMerchant?.name}
            </Descriptions.Item>
            <Descriptions.Item label="联系人/法人手机号">
              {editingMerchant?.mobile}
            </Descriptions.Item>
            <Descriptions.Item label="商家类型">
              {editingMerchant?.type === 1 ? "企业" : "个人"}
            </Descriptions.Item>
            <Descriptions.Item label="注册时间">
              {dayjs(editingMerchant?.createdAt).format("YYYY-MM-DD HH:mm:ss")}
            </Descriptions.Item>
          </Descriptions>
        </>
      )}
    </Drawer>
  );
};
