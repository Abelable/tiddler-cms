import { Descriptions, Drawer, Tooltip, Image } from "antd";

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
          <Descriptions size={"small"} title="房间信息" column={1} bordered>
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
            <Descriptions.Item label="房间类型">
              {editingRoom?.typeName}
            </Descriptions.Item>
            <Descriptions.Item label="关联酒店">
              {editingRoom?.hotelName}
            </Descriptions.Item>
            <Descriptions.Item label="早餐">
              {editingRoom?.breakfastNum
                ? `${editingRoom?.breakfastNum}份早餐`
                : "不含早餐"}
            </Descriptions.Item>
            <Descriptions.Item label="入住人数">
              {editingRoom?.guestNum}
            </Descriptions.Item>
            <Descriptions.Item label="免费取消">
              {editingRoom?.cancellable ? (
                <span style={{ color: "#87d068" }}>可免费取消</span>
              ) : (
                <span style={{ color: "#f50" }}>不可取消</span>
              )}
            </Descriptions.Item>
            <Descriptions.Item label="价格">
              {`¥${editingRoom?.price}起`}
            </Descriptions.Item>
            <Descriptions.Item label="销售佣金比例">
              {`${(editingRoom?.salesCommissionRate as number) * 100}%`}
            </Descriptions.Item>
            <Descriptions.Item label="代言奖励比例">
              {`${(editingRoom?.promotionCommissionRate as number) * 100}%`}
            </Descriptions.Item>
            <Descriptions.Item label="销量">
              {editingRoom?.salesVolume}
            </Descriptions.Item>
            <Descriptions.Item label="创建时间">
              {dayjs(editingRoom?.createdAt).format("YYYY-MM-DD HH:mm:ss")}
            </Descriptions.Item>
            <Descriptions.Item label="更新时间">
              {dayjs(editingRoom?.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
            </Descriptions.Item>
          </Descriptions>

          <Descriptions
            style={{ marginBottom: "3.2rem" }}
            size={"small"}
            title="服务商信息"
            column={1}
            bordered
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
