import { Descriptions, Divider, Drawer, Tooltip, Tag, Image } from "antd";

import { ErrorBox, ModalLoading } from "components/lib";
import dayjs from "dayjs";
import { useTicketModal } from "../util";

import type { ProductOption } from "types/common";

export const TicketModal = ({
  restaurantOptions,
}: {
  restaurantOptions: ProductOption[];
}) => {
  const { close, ticketModalOpen, editingTicket, error, isLoading } =
    useTicketModal();

  return (
    <Drawer
      forceRender={true}
      title="代金券详情"
      size={"large"}
      onClose={close}
      open={ticketModalOpen}
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
          <Divider orientation="left">代金券信息</Divider>
          <Descriptions size={"small"} column={2}>
            <Descriptions.Item label="ID">
              {editingTicket?.id}
            </Descriptions.Item>
            <Descriptions.Item label="状态">
              {editingTicket?.status === 0 ? (
                <span style={{ color: "#87d068" }}>待审核</span>
              ) : editingTicket?.status === 1 ? (
                <span style={{ color: "#296BEF" }}>售卖中</span>
              ) : (
                <Tooltip title={editingTicket?.failureReason}>
                  <span style={{ color: "#f50", cursor: "pointer" }}>
                    未过审
                  </span>
                </Tooltip>
              )}
            </Descriptions.Item>
            <Descriptions.Item label="名称">
              {`${editingTicket?.price}代${editingTicket?.originalPrice}代金券`}
            </Descriptions.Item>
            <Descriptions.Item label="关联门店">
              {editingTicket?.restaurantIds?.length &&
                editingTicket?.restaurantIds.map((id: number) => (
                  <Tag color="success" key={id}>
                    {restaurantOptions.find((item) => item.id === id)?.name}
                  </Tag>
                ))}
            </Descriptions.Item>
            <Descriptions.Item label="销售佣金比例">
              {`${(editingTicket?.salesCommissionRate as number) * 100}%`}
            </Descriptions.Item>
            <Descriptions.Item label="代言奖励比例">
              {`${(editingTicket?.promotionCommissionRate as number) * 100}%`}
            </Descriptions.Item>
            <Descriptions.Item label="销量">
              {editingTicket?.salesVolume}
            </Descriptions.Item>
            <Descriptions.Item label=""> </Descriptions.Item>
            <Descriptions.Item label="创建时间">
              {dayjs(editingTicket?.createdAt).format("YYYY-MM-DD HH:mm:ss")}
            </Descriptions.Item>
            <Descriptions.Item label="更新时间">
              {dayjs(editingTicket?.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
            </Descriptions.Item>
          </Descriptions>

          <Divider orientation="left">服务商信息</Divider>
          <Descriptions
            style={{ marginBottom: "3.2rem" }}
            size={"small"}
            column={2}
          >
            <Descriptions.Item label="服务商id">
              {editingTicket?.providerInfo?.id}
            </Descriptions.Item>
            <Descriptions.Item label="公司名称">
              {editingTicket?.providerInfo?.companyName}
            </Descriptions.Item>
            <Descriptions.Item label="营业执照照片">
              <Image
                width={68}
                src={editingTicket?.providerInfo?.businessLicensePhoto}
              />
            </Descriptions.Item>
            <Descriptions.Item label="联系人姓名">
              {editingTicket?.providerInfo?.name}
            </Descriptions.Item>
            <Descriptions.Item label="联系人手机号">
              {editingTicket?.providerInfo?.mobile}
            </Descriptions.Item>
            <Descriptions.Item label=""> </Descriptions.Item>
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
