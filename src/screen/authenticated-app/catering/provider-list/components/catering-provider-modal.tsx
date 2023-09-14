import { Descriptions, Drawer, Image } from "antd";
import { ErrorBox, ModalLoading } from "components/lib";
import dayjs from "dayjs";
import { useCateringProviderModal } from "../util";

export const CateringProviderModal = () => {
  const {
    close,
    cateringProviderModalOpen,
    editingCateringProvider,
    error,
    isLoading,
  } = useCateringProviderModal();

  return (
    <Drawer
      forceRender={true}
      title="商家详情"
      size={"large"}
      onClose={close}
      open={cateringProviderModalOpen}
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
              {editingCateringProvider?.id}
            </Descriptions.Item>
            <Descriptions.Item label="商家类型">
              {editingCateringProvider?.type === 1 ? "个人" : "企业"}
            </Descriptions.Item>
            <Descriptions.Item label="入驻时间">
              {dayjs(editingCateringProvider?.createdAt).format(
                "YYYY-MM-DD HH:mm:ss"
              )}
            </Descriptions.Item>
            <Descriptions.Item label="更新时间">
              {dayjs(editingCateringProvider?.updatedAt).format(
                "YYYY-MM-DD HH:mm:ss"
              )}
            </Descriptions.Item>
          </Descriptions>
          {editingCateringProvider?.type === 1 ? (
            <>
              <Descriptions
                style={{ marginBottom: "3.2rem" }}
                title="个人信息"
                size={"small"}
                column={1}
                bordered
              >
                <Descriptions.Item label="姓名">
                  {editingCateringProvider?.name}
                </Descriptions.Item>
                <Descriptions.Item label="身份证号">
                  {editingCateringProvider?.idCardNumber}
                </Descriptions.Item>
                <Descriptions.Item label="身份证正面照片">
                  <Image
                    width={132}
                    height={86}
                    src={editingCateringProvider?.idCardFrontPhoto}
                  />
                </Descriptions.Item>
                <Descriptions.Item label="身份证反面照片">
                  <Image
                    width={132}
                    height={86}
                    src={editingCateringProvider?.idCardFrontPhoto}
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
                  {editingCateringProvider?.mobile}
                </Descriptions.Item>
                <Descriptions.Item label="邮箱">
                  {editingCateringProvider?.email}
                </Descriptions.Item>
                <Descriptions.Item label="联系地址">
                  {editingCateringProvider?.regionDesc}
                </Descriptions.Item>
                <Descriptions.Item label="详细地址">
                  {editingCateringProvider?.addressDetail}
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
                  {editingCateringProvider?.companyName}
                </Descriptions.Item>
                <Descriptions.Item label="企业经营地址">
                  {editingCateringProvider?.regionDesc}
                </Descriptions.Item>
                <Descriptions.Item label="企业地址详情">
                  {editingCateringProvider?.addressDetail}
                </Descriptions.Item>
                <Descriptions.Item label="营业执照照片">
                  <Image
                    width={132}
                    height={86}
                    src={editingCateringProvider?.businessLicensePhoto}
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
                  {editingCateringProvider?.name}
                </Descriptions.Item>
                <Descriptions.Item label="手机号">
                  {editingCateringProvider?.mobile}
                </Descriptions.Item>
                <Descriptions.Item label="邮箱">
                  {editingCateringProvider?.email}
                </Descriptions.Item>
                <Descriptions.Item label="身份证号">
                  {editingCateringProvider?.idCardNumber}
                </Descriptions.Item>
                <Descriptions.Item label="身份证正面照片">
                  <Image
                    width={132}
                    height={86}
                    src={editingCateringProvider?.idCardFrontPhoto}
                  />
                </Descriptions.Item>
                <Descriptions.Item label="身份证反面照片">
                  <Image
                    width={132}
                    height={86}
                    src={editingCateringProvider?.idCardFrontPhoto}
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
