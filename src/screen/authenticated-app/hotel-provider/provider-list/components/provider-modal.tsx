import { Descriptions, Drawer, Image } from "antd";
import { ErrorBox, ModalLoading } from "components/lib";
import dayjs from "dayjs";
import { useProviderModal } from "../util";

export const ProviderModal = () => {
  const { close, merchantModalOpen, editingProvider, error, isLoading } =
    useProviderModal();

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
          <Descriptions
            style={{ marginBottom: "3.2rem" }}
            title="基础信息"
            size={"small"}
            column={1}
            bordered
          >
            <Descriptions.Item label="ID">
              {editingProvider?.id}
            </Descriptions.Item>
            <Descriptions.Item label="入驻时间">
              {dayjs(editingProvider?.createdAt).format("YYYY-MM-DD HH:mm:ss")}
            </Descriptions.Item>
            <Descriptions.Item label="更新时间">
              {dayjs(editingProvider?.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
            </Descriptions.Item>
          </Descriptions>
          <Descriptions
            style={{ marginBottom: "3.2rem" }}
            title="公司信息"
            size={"small"}
            column={1}
            bordered
          >
            <Descriptions.Item label="公司名称">
              {editingProvider?.companyName}
            </Descriptions.Item>
            <Descriptions.Item label="公司经营地址">
              {editingProvider?.regionDesc}
            </Descriptions.Item>
            <Descriptions.Item label="公司地址详情">
              {editingProvider?.addressDetail}
            </Descriptions.Item>
            <Descriptions.Item label="营业执照照片">
              <Image
                width={132}
                height={84}
                src={editingProvider?.businessLicensePhoto}
              />
            </Descriptions.Item>
          </Descriptions>
          <Descriptions
            style={{ marginBottom: "3.2rem" }}
            title="法人信息"
            size={"small"}
            column={1}
            bordered
          >
            <Descriptions.Item label="姓名">
              {editingProvider?.name}
            </Descriptions.Item>
            <Descriptions.Item label="手机号">
              {editingProvider?.mobile}
            </Descriptions.Item>
            <Descriptions.Item label="邮箱">
              {editingProvider?.email}
            </Descriptions.Item>
            <Descriptions.Item label="身份证号">
              {editingProvider?.idCardNumber}
            </Descriptions.Item>
            <Descriptions.Item label="身份证正面照片">
              <Image
                width={132}
                height={84}
                src={editingProvider?.idCardFrontPhoto}
              />
            </Descriptions.Item>
            <Descriptions.Item label="身份证反面照片">
              <Image
                width={132}
                height={84}
                src={editingProvider?.idCardFrontPhoto}
              />
            </Descriptions.Item>
            <Descriptions.Item label="手持身份证照片">
              <Image
                width={132}
                height={84}
                src={editingProvider?.holdIdCardPhoto}
              />
            </Descriptions.Item>
          </Descriptions>
          <Descriptions
            style={{ marginBottom: "3.2rem" }}
            title="银行信息"
            size={"small"}
            column={1}
            bordered
          >
            <Descriptions.Item label="持卡人姓名">
              {editingProvider?.bankCardOwnerName}
            </Descriptions.Item>
            <Descriptions.Item label="银行账号">
              {editingProvider?.bankCardNumber}
            </Descriptions.Item>
            <Descriptions.Item label="开户银行及支行名称">
              {editingProvider?.bankName}
            </Descriptions.Item>
          </Descriptions>
        </>
      )}
    </Drawer>
  );
};
