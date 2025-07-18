import { Descriptions, Drawer, Image } from "antd";
import { ErrorBox, ModalLoading } from "components/lib";
import dayjs from "dayjs";
import { useCateringMerchantModal } from "../util";

export const CateringMerchantModal = () => {
  const {
    close,
    cateringMerchantModalOpen,
    editingCateringMerchant,
    error,
    isLoading,
  } = useCateringMerchantModal();

  return (
    <Drawer
      forceRender={true}
      title="商家详情"
      size={"large"}
      onClose={close}
      open={cateringMerchantModalOpen}
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
              {editingCateringMerchant?.id}
            </Descriptions.Item>
            <Descriptions.Item label="商家类型">
              {editingCateringMerchant?.type === 1 ? "个体" : "企业"}
            </Descriptions.Item>
            <Descriptions.Item label="入驻时间">
              {dayjs(editingCateringMerchant?.createdAt).format(
                "YYYY-MM-DD HH:mm:ss"
              )}
            </Descriptions.Item>
            <Descriptions.Item label="更新时间">
              {dayjs(editingCateringMerchant?.updatedAt).format(
                "YYYY-MM-DD HH:mm:ss"
              )}
            </Descriptions.Item>
          </Descriptions>
          {editingCateringMerchant?.type === 1 ? (
            <>
              <Descriptions
                style={{ marginBottom: "3.2rem" }}
                title="个体信息"
                size={"small"}
                column={1}
                bordered
              >
                <Descriptions.Item label="身份证正面照片">
                  <Image
                    width={132}
                    height={86}
                    src={editingCateringMerchant?.idCardFrontPhoto}
                  />
                </Descriptions.Item>
                <Descriptions.Item label="身份证反面照片">
                  <Image
                    width={132}
                    height={86}
                    src={editingCateringMerchant?.idCardFrontPhoto}
                  />
                </Descriptions.Item>
                <Descriptions.Item label="姓名">
                  {editingCateringMerchant?.name}
                </Descriptions.Item>
                <Descriptions.Item label="身份证号">
                  {editingCateringMerchant?.idCardNumber}
                </Descriptions.Item>
                <Descriptions.Item label="营业执照照片">
                  <Image
                    width={132}
                    height={86}
                    src={editingCateringMerchant?.businessLicensePhoto}
                  />
                </Descriptions.Item>
                <Descriptions.Item label="卫生许可证照片">
                  <Image
                    width={132}
                    height={86}
                    src={editingCateringMerchant?.hygienicLicensePhoto}
                  />
                </Descriptions.Item>
              </Descriptions>
              <Descriptions
                style={{ marginBottom: "3.2rem" }}
                title="联系方式"
                size={"small"}
                column={1}
                bordered
              >
                <Descriptions.Item label="手机号">
                  {editingCateringMerchant?.mobile}
                </Descriptions.Item>
                <Descriptions.Item label="邮箱">
                  {editingCateringMerchant?.email}
                </Descriptions.Item>
                <Descriptions.Item label="联系地址">
                  {editingCateringMerchant?.regionDesc}
                </Descriptions.Item>
                <Descriptions.Item label="详细地址">
                  {editingCateringMerchant?.addressDetail}
                </Descriptions.Item>
              </Descriptions>
            </>
          ) : (
            <>
              <Descriptions
                style={{ marginBottom: "3.2rem" }}
                title="企业信息"
                size={"small"}
                column={1}
                bordered
              >
                <Descriptions.Item label="企业名称">
                  {editingCateringMerchant?.companyName}
                </Descriptions.Item>
                <Descriptions.Item label="企业经营地址">
                  {editingCateringMerchant?.regionDesc}
                </Descriptions.Item>
                <Descriptions.Item label="企业地址详情">
                  {editingCateringMerchant?.addressDetail}
                </Descriptions.Item>
                <Descriptions.Item label="营业执照照片">
                  <Image
                    width={132}
                    height={86}
                    src={editingCateringMerchant?.businessLicensePhoto}
                  />
                </Descriptions.Item>
                <Descriptions.Item label="卫生许可证照片">
                  <Image
                    width={132}
                    height={86}
                    src={editingCateringMerchant?.hygienicLicensePhoto}
                  />
                </Descriptions.Item>
              </Descriptions>
              <Descriptions
                style={{ marginBottom: "3.2rem" }}
                title="法人信息"
                size={"small"}
                column={2}
              >
                <Descriptions.Item label="姓名">
                  {editingCateringMerchant?.name}
                </Descriptions.Item>
                <Descriptions.Item label="手机号">
                  {editingCateringMerchant?.mobile}
                </Descriptions.Item>
                <Descriptions.Item label="邮箱">
                  {editingCateringMerchant?.email}
                </Descriptions.Item>
                <Descriptions.Item label="身份证号">
                  {editingCateringMerchant?.idCardNumber}
                </Descriptions.Item>
                <Descriptions.Item label="身份证正面照片">
                  <Image
                    width={132}
                    height={86}
                    src={editingCateringMerchant?.idCardFrontPhoto}
                  />
                </Descriptions.Item>
                <Descriptions.Item label="身份证反面照片">
                  <Image
                    width={132}
                    height={86}
                    src={editingCateringMerchant?.idCardFrontPhoto}
                  />
                </Descriptions.Item>
              </Descriptions>
            </>
          )}
        </>
      )}
    </Drawer>
  );
};
