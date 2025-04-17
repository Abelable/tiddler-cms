import {
  Descriptions,
  Divider,
  Drawer,
  Image,
  Avatar,
  Tooltip,
  Tag,
} from "antd";
import { UserOutlined } from "@ant-design/icons";

import { ErrorBox, ModalLoading } from "components/lib";
import dayjs from "dayjs";
import { useGoodsDetailModal } from "../util";

import type { CategoryOption } from "types/category";

export const DetailModal = ({
  shopCategoryOptions,
  goodsCategoryOptions,
}: {
  shopCategoryOptions: CategoryOption[];
  goodsCategoryOptions: CategoryOption[];
}) => {
  const { close, goodsModalOpen, editingGoods, error, isLoading } =
    useGoodsDetailModal();

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
          <Divider orientation="left">商品信息</Divider>
          <Descriptions size={"small"} column={2} bordered>
            <Descriptions.Item label="商品ID">
              {editingGoods?.id}
            </Descriptions.Item>
            <Descriptions.Item label="状态">
              {editingGoods?.status === 0 ? (
                <span style={{ color: "#87d068" }}>待审核</span>
              ) : editingGoods?.status === 1 ? (
                <span style={{ color: "#296BEF", cursor: "pointer" }}>
                  售卖中
                </span>
              ) : (
                <Tooltip title={editingGoods?.failureReason}>
                  <span style={{ color: "#f50", cursor: "pointer" }}>
                    未过审
                  </span>
                </Tooltip>
              )}
            </Descriptions.Item>
            <Descriptions.Item label="图片">
              <Image width={68} src={editingGoods?.cover} />
            </Descriptions.Item>
            <Descriptions.Item label="名称">
              {editingGoods?.name}
            </Descriptions.Item>
            <Descriptions.Item label="分类">
              {
                goodsCategoryOptions.find(
                  (item) => item.id === editingGoods?.categoryId
                )?.name
              }
            </Descriptions.Item>
            <Descriptions.Item label="价格">
              {`¥${editingGoods?.price}`}
            </Descriptions.Item>
            <Descriptions.Item label="销售佣金比例">
              {`${editingGoods?.salesCommissionRate}%`}
            </Descriptions.Item>
            <Descriptions.Item label="推广佣金比例">
              {`${editingGoods?.promotionCommissionRate}%`}
            </Descriptions.Item>
            <Descriptions.Item label="库存">
              {editingGoods?.stock}
            </Descriptions.Item>
            <Descriptions.Item label="销量">
              {editingGoods?.salesVolume}
            </Descriptions.Item>
            <Descriptions.Item label="创建时间">
              {dayjs(editingGoods?.createdAt).format("YYYY-MM-DD HH:mm:ss")}
            </Descriptions.Item>
            <Descriptions.Item label="更新时间">
              {dayjs(editingGoods?.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
            </Descriptions.Item>
          </Descriptions>

          <Divider orientation="left">店铺信息</Divider>
          <Descriptions size={"small"} column={2} bordered>
            <Descriptions.Item label="店铺ID">
              {editingGoods?.shopInfo?.id}
            </Descriptions.Item>
            <Descriptions.Item label="店铺头像">
              <Avatar
                src={editingGoods?.shopInfo?.logo}
                icon={<UserOutlined />}
                size="small"
              />
            </Descriptions.Item>
            <Descriptions.Item label="店铺名称">
              {editingGoods?.shopInfo?.name}
            </Descriptions.Item>
            <Descriptions.Item label="店铺分类">
              {(editingGoods?.shopInfo?.categoryIds || []).map((id, index) => (
                <Tag key={index}>
                  {shopCategoryOptions.find((item) => item.id === id)?.name}
                </Tag>
              ))}
            </Descriptions.Item>
            <Descriptions.Item label="注册时间">
              {dayjs(editingGoods?.shopInfo?.createdAt).format(
                "YYYY-MM-DD HH:mm:ss"
              )}
            </Descriptions.Item>
            <Descriptions.Item label="更新时间">
              {dayjs(editingGoods?.shopInfo?.updatedAt).format(
                "YYYY-MM-DD HH:mm:ss"
              )}
            </Descriptions.Item>
          </Descriptions>

          <Divider orientation="left">商家信息</Divider>
          <Descriptions
            style={{ marginBottom: "3.2rem" }}
            size={"small"}
            column={2}
            bordered
          >
            <Descriptions.Item label="ID">
              {editingGoods?.merchantInfo?.id}
            </Descriptions.Item>
            <Descriptions.Item label="商家类型">
              {editingGoods?.merchantInfo?.type === 1 ? "个人" : "企业"}
            </Descriptions.Item>
            <Descriptions.Item label="联系人姓名">
              {editingGoods?.merchantInfo?.name}
            </Descriptions.Item>
            <Descriptions.Item label="手机号">
              {editingGoods?.merchantInfo?.mobile}
            </Descriptions.Item>
            <Descriptions.Item label="入驻时间">
              {dayjs(editingGoods?.createdAt).format("YYYY-MM-DD HH:mm:ss")}
            </Descriptions.Item>
            <Descriptions.Item label="更新时间">
              {dayjs(editingGoods?.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
            </Descriptions.Item>
          </Descriptions>
        </>
      )}
    </Drawer>
  );
};
