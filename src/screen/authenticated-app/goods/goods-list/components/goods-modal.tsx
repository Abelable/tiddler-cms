import { Descriptions, Drawer, Image } from "antd";
import { ErrorBox, ModalLoading } from "components/lib";
import dayjs from "dayjs";
import { useGoodsModal } from "../util";

import type { GoodsCategoryOption } from "types/goodsCategory";
import type { ShopCategoryOption } from "types/shopCategory";

export const GoodsModal = ({
  goodsCategoryOptions,
  shopCategoryOptions,
}: {
  goodsCategoryOptions: GoodsCategoryOption[];
  shopCategoryOptions: ShopCategoryOption[];
}) => {
  const { close, goodsModalOpen, editingGoods, error, isLoading } =
    useGoodsModal();

  return (
    <Drawer
      forceRender={true}
      title="商品详情"
      size={"large"}
      onClose={close}
      open={goodsModalOpen}
      bodyStyle={{ paddingBottom: 80 }}
    >
      <ErrorBox error={error} />
      {isLoading ? (
        <ModalLoading />
      ) : (
        <>
          <Descriptions
            style={{ marginBottom: "3.2rem" }}
            title="商家信息"
            size={"small"}
            column={2}
          >
            <Descriptions
              style={{ marginBottom: "3.2rem" }}
              title="基础信息"
              size={"small"}
              column={2}
            >
              <Descriptions.Item label="ID">
                {editingGoods?.id}
              </Descriptions.Item>
              <Descriptions.Item label="商家类型">
                {editingGoods?.merchanctInfo?.type === 1 ? "个人" : "企业"}
              </Descriptions.Item>
              <Descriptions.Item label="入驻时间">
                {dayjs(editingGoods?.createdAt).format("YYYY-MM-DD HH:mm:ss")}
              </Descriptions.Item>
              <Descriptions.Item label="更新时间">
                {dayjs(editingGoods?.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
              </Descriptions.Item>
            </Descriptions>
            {editingGoods?.merchanctInfo?.type === 1 ? (
              <>
                <Descriptions
                  style={{ marginBottom: "3.2rem" }}
                  title="个人信息"
                  size={"small"}
                  column={2}
                >
                  <Descriptions.Item label="姓名">
                    {editingGoods?.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="身份证号">
                    {editingGoods?.merchanctInfo.idCardNumber}
                  </Descriptions.Item>
                  <Descriptions.Item label="身份证正面照片">
                    <Image
                      width={132}
                      height={86}
                      src={editingGoods?.merchanctInfo.idCardFrontPhoto}
                    />
                  </Descriptions.Item>
                  <Descriptions.Item label="身份证反面照片">
                    <Image
                      width={132}
                      height={86}
                      src={editingGoods?.merchanctInfo.idCardFrontPhoto}
                    />
                  </Descriptions.Item>
                  <Descriptions.Item label="手持身份证照片">
                    <Image
                      width={132}
                      height={86}
                      src={editingGoods?.merchanctInfo.holdIdCardPhoto}
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
                    {editingGoods?.merchanctInfo.mobile}
                  </Descriptions.Item>
                  <Descriptions.Item label="邮箱">
                    {editingGoods?.merchanctInfo.email}
                  </Descriptions.Item>
                  <Descriptions.Item label="联系地址">
                    {editingGoods?.merchanctInfo.regionDesc}
                  </Descriptions.Item>
                  <Descriptions.Item label="详细地址">
                    {editingGoods?.merchanctInfo.addressDetail}
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
                    {editingGoods?.merchanctInfo?.companyName}
                  </Descriptions.Item>
                  <Descriptions.Item label="企业经营地址">
                    {editingGoods?.merchanctInfo?.regionDesc}
                  </Descriptions.Item>
                  <Descriptions.Item label="企业地址详情">
                    {editingGoods?.merchanctInfo?.addressDetail}
                  </Descriptions.Item>
                  <Descriptions.Item label="营业执照照片">
                    <Image
                      width={132}
                      height={86}
                      src={editingGoods?.merchanctInfo?.businessLicensePhoto}
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
                    {editingGoods?.merchanctInfo?.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="手机号">
                    {editingGoods?.merchanctInfo?.mobile}
                  </Descriptions.Item>
                  <Descriptions.Item label="邮箱">
                    {editingGoods?.merchanctInfo?.email}
                  </Descriptions.Item>
                  <Descriptions.Item label="身份证号">
                    {editingGoods?.merchanctInfo?.idCardNumber}
                  </Descriptions.Item>
                  <Descriptions.Item label="身份证正面照片">
                    <Image
                      width={132}
                      height={86}
                      src={editingGoods?.merchanctInfo?.idCardFrontPhoto}
                    />
                  </Descriptions.Item>
                  <Descriptions.Item label="身份证反面照片">
                    <Image
                      width={132}
                      height={86}
                      src={editingGoods?.merchanctInfo?.idCardFrontPhoto}
                    />
                  </Descriptions.Item>
                  <Descriptions.Item label="手持身份证照片">
                    <Image
                      width={132}
                      height={86}
                      src={editingGoods?.merchanctInfo?.holdIdCardPhoto}
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
                {editingGoods?.merchanctInfo?.bankCardOwnerName}
              </Descriptions.Item>
              <Descriptions.Item label="银行账号">
                {editingGoods?.merchanctInfo?.bankCardNumber}
              </Descriptions.Item>
              <Descriptions.Item label="开户银行及支行名称">
                {editingGoods?.merchanctInfo?.bankName}
              </Descriptions.Item>
            </Descriptions>
            <Descriptions
              style={{ marginBottom: "3.2rem" }}
              title="店铺信息"
              size={"small"}
              column={2}
            >
              <Descriptions.Item label="店铺名称">
                {editingGoods?.merchanctInfo?.shopName}
              </Descriptions.Item>
              <Descriptions.Item label="店铺分类">
                {
                  shopCategoryOptions.find(
                    (item) =>
                      item.id === editingGoods?.merchanctInfo?.shopCategoryId
                  )?.name
                }
              </Descriptions.Item>
            </Descriptions>
          </Descriptions>
        </>
      )}
    </Drawer>
  );
};
