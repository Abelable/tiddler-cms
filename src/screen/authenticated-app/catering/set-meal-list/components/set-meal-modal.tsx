import { Descriptions, Divider, Drawer, Tooltip, Tag, Image } from "antd";

import { ErrorBox, ModalLoading } from "components/lib";
import dayjs from "dayjs";
import { useSetMealModal } from "../util";

import type { DataOption } from "types/common";

export const SetMealModal = ({
  restaurantOptions,
}: {
  restaurantOptions: DataOption[];
}) => {
  const { close, setMealModalOpen, editingSetMeal, error, isLoading } =
    useSetMealModal();

  return (
    <Drawer
      forceRender={true}
      title="套餐详情"
      size={"large"}
      onClose={close}
      open={setMealModalOpen}
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
          <Divider orientation="left">套餐信息</Divider>
          <Descriptions size={"small"} column={2}>
            <Descriptions.Item label="ID">
              {editingSetMeal?.id}
            </Descriptions.Item>
            <Descriptions.Item label="状态">
              {editingSetMeal?.status === 0 ? (
                <span style={{ color: "#87d068" }}>待审核</span>
              ) : editingSetMeal?.status === 1 ? (
                <span style={{ color: "#296BEF" }}>售卖中</span>
              ) : (
                <Tooltip title={editingSetMeal?.failureReason}>
                  <span style={{ color: "#f50", cursor: "pointer" }}>
                    未过审
                  </span>
                </Tooltip>
              )}
            </Descriptions.Item>
            <Descriptions.Item label="名称">
              {editingSetMeal?.name}
            </Descriptions.Item>
            <Descriptions.Item label="关联门店">
              {editingSetMeal?.restaurantIds?.length &&
                editingSetMeal?.restaurantIds.map((id: number) => (
                  <Tag color="success" key={id}>
                    {restaurantOptions.find((item) => item.id === id)?.name}
                  </Tag>
                ))}
            </Descriptions.Item>
            <Descriptions.Item label="销售佣金比例">
              {`${(editingSetMeal?.salesCommissionRate as number) * 100}%`}
            </Descriptions.Item>
            <Descriptions.Item label="推广佣金比例">
              {`${(editingSetMeal?.promotionCommissionRate as number) * 100}%`}
            </Descriptions.Item>
            <Descriptions.Item label="销量">
              {editingSetMeal?.salesVolume}
            </Descriptions.Item>
            <Descriptions.Item label=""> </Descriptions.Item>
            <Descriptions.Item label="创建时间">
              {dayjs(editingSetMeal?.createdAt).format("YYYY-MM-DD HH:mm:ss")}
            </Descriptions.Item>
            <Descriptions.Item label="更新时间">
              {dayjs(editingSetMeal?.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
            </Descriptions.Item>
          </Descriptions>

          <Divider orientation="left">服务商信息</Divider>
          <Descriptions
            style={{ marginBottom: "3.2rem" }}
            size={"small"}
            column={2}
          >
            <Descriptions.Item label="服务商id">
              {editingSetMeal?.providerInfo?.id}
            </Descriptions.Item>
            <Descriptions.Item label="公司名称">
              {editingSetMeal?.providerInfo?.companyName}
            </Descriptions.Item>
            <Descriptions.Item label="营业执照照片">
              <Image
                width={68}
                src={editingSetMeal?.providerInfo?.businessLicensePhoto}
              />
            </Descriptions.Item>
            <Descriptions.Item label="联系人姓名">
              {editingSetMeal?.providerInfo?.name}
            </Descriptions.Item>
            <Descriptions.Item label="联系人手机号">
              {editingSetMeal?.providerInfo?.mobile}
            </Descriptions.Item>
            <Descriptions.Item label=""> </Descriptions.Item>
            <Descriptions.Item label="入驻时间">
              {dayjs(editingSetMeal?.createdAt).format("YYYY-MM-DD HH:mm:ss")}
            </Descriptions.Item>
            <Descriptions.Item label="更新时间">
              {dayjs(editingSetMeal?.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
            </Descriptions.Item>
          </Descriptions>
        </>
      )}
    </Drawer>
  );
};
