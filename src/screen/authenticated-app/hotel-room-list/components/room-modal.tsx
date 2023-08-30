import { Descriptions, Divider, Drawer, Tooltip, Tag, Image } from "antd";

import { ErrorBox, ModalLoading } from "components/lib";
import dayjs from "dayjs";
import { useRoomModal } from "../util";

export const RoomModal = () => {
  const { close, roomModalOpen, editingRoom, error, isLoading } =
    useRoomModal();

  return (
    <Drawer
      forceRender={true}
      title="房间详情"
      size={"large"}
      onClose={close}
      open={roomModalOpen}
      bodyStyle={{ paddingBottom: 80 }}
    >
      <ErrorBox error={error} />
      {isLoading ? (
        <ModalLoading />
      ) : (
        <>
          <Divider orientation="left">房间信息</Divider>
          <Descriptions size={"small"} column={2}>
            <Descriptions.Item label="房间id">
              {editingRoom?.id}
            </Descriptions.Item>
            <Descriptions.Item label="状态">
              {editingRoom?.status === 0 ? (
                <span style={{ color: "#87d068" }}>待审核</span>
              ) : editingRoom?.status === 1 ? (
                <span style={{ color: "#296BEF" }}>售卖中</span>
              ) : (
                <Tooltip title={editingRoom?.failureReason}>
                  <span style={{ color: "#f50", cursor: "pointer" }}>
                    未过审
                  </span>
                </Tooltip>
              )}
            </Descriptions.Item>
            <Descriptions.Item label="类型">
              {editingRoom?.typeName}
            </Descriptions.Item>
            <Descriptions.Item label="关联景点">
              <Tag color="success">{editingRoom?.hotelName}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="价格">
              {`¥${editingRoom?.price}起`}
            </Descriptions.Item>
            <Descriptions.Item label="销售佣金比例">
              {`${(editingRoom?.salesCommissionRate as number) * 100}%`}
            </Descriptions.Item>
            <Descriptions.Item label="推广佣金比例">
              {`${(editingRoom?.promotionCommissionRate as number) * 100}%`}
            </Descriptions.Item>
            <Descriptions.Item label="销量">
              {editingRoom?.salesVolume}
            </Descriptions.Item>
            <Descriptions.Item label=""> </Descriptions.Item>
            <Descriptions.Item label="创建时间">
              {dayjs(editingRoom?.createdAt).format("YYYY-MM-DD HH:mm:ss")}
            </Descriptions.Item>
            <Descriptions.Item label="更新时间">
              {dayjs(editingRoom?.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
            </Descriptions.Item>
          </Descriptions>

          <Divider orientation="left">服务商信息</Divider>
          <Descriptions
            style={{ marginBottom: "3.2rem" }}
            size={"small"}
            column={2}
          >
            <Descriptions.Item label="服务商id">
              {editingRoom?.providerInfo?.id}
            </Descriptions.Item>
            <Descriptions.Item label="公司名称">
              {editingRoom?.providerInfo?.companyName}
            </Descriptions.Item>
            <Descriptions.Item label="营业执照照片">
              <Image
                width={68}
                src={editingRoom?.providerInfo?.businessLicensePhoto}
              />
            </Descriptions.Item>
            <Descriptions.Item label="联系人姓名">
              {editingRoom?.providerInfo?.name}
            </Descriptions.Item>
            <Descriptions.Item label="联系人手机号">
              {editingRoom?.providerInfo?.mobile}
            </Descriptions.Item>
            <Descriptions.Item label=""> </Descriptions.Item>
            <Descriptions.Item label="入驻时间">
              {dayjs(editingRoom?.createdAt).format("YYYY-MM-DD HH:mm:ss")}
            </Descriptions.Item>
            <Descriptions.Item label="更新时间">
              {dayjs(editingRoom?.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
            </Descriptions.Item>
          </Descriptions>
        </>
      )}
    </Drawer>
  );
};
