import { Descriptions, Divider, Drawer, Image, Avatar, Tooltip } from "antd";
import { UserOutlined } from "@ant-design/icons";

import { ErrorBox, ModalLoading } from "components/lib";
import dayjs from "dayjs";
import { useTicketModal } from "../util";

import type { CategoryOption } from "types/category";

export const TicketModal = ({
  ticketCategoryOptions,
  shopCategoryOptions,
}: {
  ticketCategoryOptions: CategoryOption[];
  shopCategoryOptions: CategoryOption[];
}) => {
  const { close, ticketModalOpen, editingTicket, error, isLoading } =
    useTicketModal();

  return (
    <Drawer
      forceRender={true}
      title="商品详情"
      size={"large"}
      onClose={close}
      open={ticketModalOpen}
      bodyStyle={{ paddingBottom: 80 }}
    >
      <ErrorBox error={error} />
      {isLoading ? (
        <ModalLoading />
      ) : (
        <>
          <Divider orientation="left">商品信息</Divider>
          <Descriptions size={"small"} column={2}>
            <Descriptions.Item label="ID">
              {editingTicket?.id}
            </Descriptions.Item>
            <Descriptions.Item label="状态">
              {editingTicket?.status === 0 ? (
                <span style={{ color: "#87d068" }}>待审核</span>
              ) : editingTicket?.status === 1 ? (
                <span style={{ color: "#296BEF", cursor: "pointer" }}>
                  售卖中
                </span>
              ) : (
                <Tooltip title={editingTicket?.failureReason}>
                  <span style={{ color: "#f50", cursor: "pointer" }}>
                    未过审
                  </span>
                </Tooltip>
              )}
            </Descriptions.Item>
            <Descriptions.Item label="图片">
              <Image width={68} src={editingTicket?.image} />
            </Descriptions.Item>
            <Descriptions.Item label="名称">
              {editingTicket?.name}
            </Descriptions.Item>
            <Descriptions.Item label="分类">
              {
                ticketCategoryOptions.find(
                  (item) => item.id === editingTicket?.categoryId
                )?.name
              }
            </Descriptions.Item>
            <Descriptions.Item label="价格">
              {`¥${editingTicket?.price}`}
            </Descriptions.Item>
            <Descriptions.Item label="库存">
              {editingTicket?.stock}
            </Descriptions.Item>
            <Descriptions.Item label="销售佣金比例">
              {`${(editingTicket?.salesCommissionRate as number) * 100}%`}
            </Descriptions.Item>
            <Descriptions.Item label="推广佣金比例">
              {`${(editingTicket?.promotionCommissionRate as number) * 100}%`}
            </Descriptions.Item>
            <Descriptions.Item label="销量">
              {editingTicket?.salesVolume}
            </Descriptions.Item>
            <Descriptions.Item label=""> </Descriptions.Item>
            <Descriptions.Item label="添加时间">
              {dayjs(editingTicket?.shopInfo?.createdAt).format(
                "YYYY-MM-DD HH:mm:ss"
              )}
            </Descriptions.Item>
            <Descriptions.Item label="更新时间">
              {dayjs(editingTicket?.shopInfo?.updatedAt).format(
                "YYYY-MM-DD HH:mm:ss"
              )}
            </Descriptions.Item>
          </Descriptions>

          <Divider orientation="left">店铺信息</Divider>
          <Descriptions size={"small"} column={2}>
            <Descriptions.Item label="ID">
              {editingTicket?.shopInfo?.id}
            </Descriptions.Item>
            <Descriptions.Item label="店铺头像">
              <Avatar
                src={editingTicket?.shopInfo?.avatar}
                icon={<UserOutlined />}
                size="small"
              />
            </Descriptions.Item>
            <Descriptions.Item label="店铺名称">
              {editingTicket?.shopInfo?.name}
            </Descriptions.Item>
            <Descriptions.Item label="店铺分类">
              {
                shopCategoryOptions.find(
                  (item) => item.id === editingTicket?.shopInfo?.categoryId
                )?.name
              }
            </Descriptions.Item>
            <Descriptions.Item label="注册时间">
              {dayjs(editingTicket?.shopInfo?.createdAt).format(
                "YYYY-MM-DD HH:mm:ss"
              )}
            </Descriptions.Item>
            <Descriptions.Item label="更新时间">
              {dayjs(editingTicket?.shopInfo?.updatedAt).format(
                "YYYY-MM-DD HH:mm:ss"
              )}
            </Descriptions.Item>
          </Descriptions>

          <Divider orientation="left">商家信息</Divider>
          <Descriptions
            style={{ marginBottom: "3.2rem" }}
            size={"small"}
            column={2}
          >
            <Descriptions.Item label="ID">
              {editingTicket?.merchantInfo?.id}
            </Descriptions.Item>
            <Descriptions.Item label="商家类型">
              {editingTicket?.merchantInfo?.type === 1 ? "个人" : "企业"}
            </Descriptions.Item>
            <Descriptions.Item label="联系人姓名">
              {editingTicket?.merchantInfo?.name}
            </Descriptions.Item>
            <Descriptions.Item label="手机号">
              {editingTicket?.merchantInfo?.mobile}
            </Descriptions.Item>
            <Descriptions.Item label="入驻时间">
              {dayjs(editingTicket?.createdAt).format("YYYY-MM-DD HH:mm:ss")}
            </Descriptions.Item>
            <Descriptions.Item label="更新时间">
              {dayjs(editingTicket?.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
            </Descriptions.Item>
          </Descriptions>
        </>
      )}
    </Drawer>
  );
};
