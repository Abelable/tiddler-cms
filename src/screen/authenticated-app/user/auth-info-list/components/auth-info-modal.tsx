import { Descriptions, Drawer, Image } from "antd";
import { ErrorBox, ModalLoading } from "components/lib";
import { useAuthInfoModal } from "../util";

export const AuthInfoModal = () => {
  const { close, merchantModalOpen, editingAuthInfo, error, isLoading } =
    useAuthInfoModal();

  return (
    <Drawer
      forceRender={true}
      title="商家详情"
      size={"large"}
      onClose={close}
      open={merchantModalOpen}
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
          <Descriptions
            style={{ marginBottom: "3.2rem" }}
            title="基础信息"
            size={"small"}
            column={1}
            bordered
          >
            <Descriptions.Item label="ID">
              {editingAuthInfo?.id}
            </Descriptions.Item>
            <Descriptions.Item label="姓名">
              {editingAuthInfo?.name}
            </Descriptions.Item>
            <Descriptions.Item label="手机号">
              {editingAuthInfo?.mobile}
            </Descriptions.Item>
            <Descriptions.Item label="身份证号">
              {editingAuthInfo?.idCardNumber}
            </Descriptions.Item>
            <Descriptions.Item label="身份证正面照片">
              <Image
                width={132}
                height={84}
                src={editingAuthInfo?.idCardFrontPhoto}
              />
            </Descriptions.Item>
            <Descriptions.Item label="身份证反面照片">
              <Image
                width={132}
                height={84}
                src={editingAuthInfo?.idCardFrontPhoto}
              />
            </Descriptions.Item>
            <Descriptions.Item label="手持身份证照片">
              <Image
                width={132}
                height={84}
                src={editingAuthInfo?.holdIdCardPhoto}
              />
            </Descriptions.Item>
          </Descriptions>
        </>
      )}
    </Drawer>
  );
};
