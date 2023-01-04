import { Descriptions, Drawer, Image } from "antd";
import { ErrorBox, ModalLoading } from "components/lib";
import dayjs from "dayjs";
import { useMerchantModal } from "../util";
import { ShopCategoryOption } from "types/shopCategory";

export const MerchantModal = ({
  shopCategoryOptions,
}: {
  shopCategoryOptions: ShopCategoryOption[];
}) => {
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
          <Descriptions
            style={{ marginBottom: "3.2rem" }}
            title="基础信息"
            size={"small"}
            column={2}
          >
            <Descriptions.Item label="ID">
              {editingMerchant?.id}
            </Descriptions.Item>
            <Descriptions.Item label="商家类型">
              {editingMerchant?.type === 1 ? "企业" : "个人"}
            </Descriptions.Item>
            <Descriptions.Item label="入驻时间">
              {dayjs(editingMerchant?.createdAt).format("YYYY-MM-DD HH:mm:ss")}
            </Descriptions.Item>
            <Descriptions.Item label="更新时间">
              {dayjs(editingMerchant?.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
            </Descriptions.Item>
          </Descriptions>
          {editingMerchant?.type === 1 ? (
            <>
              <Descriptions
                style={{ marginBottom: "3.2rem" }}
                title="个人信息"
                size={"small"}
                column={2}
              >
                <Descriptions.Item label="姓名">
                  {editingMerchant?.name}
                </Descriptions.Item>
                <Descriptions.Item label="身份证号">
                  {editingMerchant?.idCardNumber}
                </Descriptions.Item>
                <Descriptions.Item label="身份证正面照片">
                  <Image
                    width={132}
                    height={86}
                    src={editingMerchant?.idCardFrontPhoto}
                  />
                </Descriptions.Item>
                <Descriptions.Item label="身份证反面照片">
                  <Image
                    width={132}
                    height={86}
                    src={editingMerchant?.idCardFrontPhoto}
                  />
                </Descriptions.Item>
                <Descriptions.Item label="手持身份证照片">
                  <Image
                    width={132}
                    height={86}
                    src={editingMerchant?.holdIdCardPhoto}
                  />
                </Descriptions.Item>
              </Descriptions>
              <Descriptions
                style={{ marginBottom: "3.2rem" }}
                title="联系方式"
                size={"small"}
                column={2}
              >
                <Descriptions.Item label="手机号">
                  {editingMerchant?.mobile}
                </Descriptions.Item>
                <Descriptions.Item label="邮箱">
                  {editingMerchant?.email}
                </Descriptions.Item>
                <Descriptions.Item label="联系地址">
                  {editingMerchant?.regionDesc}
                </Descriptions.Item>
                <Descriptions.Item label="详细地址">
                  {editingMerchant?.addressDetail}
                </Descriptions.Item>
              </Descriptions>
            </>
          ) : (
            <>
              <Descriptions
                style={{ marginBottom: "3.2rem" }}
                title="企业信息"
                size={"small"}
                column={2}
              >
                <Descriptions.Item label="企业名称">
                  {editingMerchant?.companyName}
                </Descriptions.Item>
                <Descriptions.Item label="企业经营地址">
                  {editingMerchant?.regionDesc}
                </Descriptions.Item>
                <Descriptions.Item label="企业地址详情">
                  {editingMerchant?.addressDetail}
                </Descriptions.Item>
                <Descriptions.Item label="营业执照照片">
                  <Image
                    width={132}
                    height={86}
                    src={editingMerchant?.businessLicensePhoto}
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
                  {editingMerchant?.name}
                </Descriptions.Item>
                <Descriptions.Item label="手机号">
                  {editingMerchant?.mobile}
                </Descriptions.Item>
                <Descriptions.Item label="邮箱">
                  {editingMerchant?.email}
                </Descriptions.Item>
                <Descriptions.Item label="身份证号">
                  {editingMerchant?.idCardNumber}
                </Descriptions.Item>
                <Descriptions.Item label="身份证正面照片">
                  <Image
                    width={132}
                    height={86}
                    src={editingMerchant?.idCardFrontPhoto}
                  />
                </Descriptions.Item>
                <Descriptions.Item label="身份证反面照片">
                  <Image
                    width={132}
                    height={86}
                    src={editingMerchant?.idCardFrontPhoto}
                  />
                </Descriptions.Item>
                <Descriptions.Item label="手持身份证照片">
                  <Image
                    width={132}
                    height={86}
                    src={editingMerchant?.holdIdCardPhoto}
                  />
                </Descriptions.Item>
              </Descriptions>
            </>
          )}
          <Descriptions
            style={{ marginBottom: "3.2rem" }}
            title="银行信息"
            size={"small"}
            column={2}
          >
            <Descriptions.Item label="持卡人姓名">
              {editingMerchant?.bankCardOwnerName}
            </Descriptions.Item>
            <Descriptions.Item label="银行账号">
              {editingMerchant?.bankCardNumber}
            </Descriptions.Item>
            <Descriptions.Item label="开户银行及支行名称">
              {editingMerchant?.bankName}
            </Descriptions.Item>
          </Descriptions>
          <Descriptions
            style={{ marginBottom: "3.2rem" }}
            title="店铺信息"
            size={"small"}
            column={2}
          >
            <Descriptions.Item label="店铺名称">
              {editingMerchant?.shopName}
            </Descriptions.Item>
            <Descriptions.Item label="店铺分类">
              {
                shopCategoryOptions.find(
                  (item) => item.id === editingMerchant?.shopCategoryId
                )?.name
              }
            </Descriptions.Item>
          </Descriptions>
        </>
      )}
    </Drawer>
  );
};
