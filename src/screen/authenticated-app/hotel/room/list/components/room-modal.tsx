import {
  Descriptions,
  Drawer,
  Tooltip,
  Image,
  Space,
  Button,
  Divider,
  Form,
  Row,
  Col,
  InputNumber,
  Tag,
  Avatar,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { ErrorBox, ModalLoading } from "components/lib";

import dayjs from "dayjs";
import { useForm } from "antd/es/form/Form";
import { useRoomListQueryKey, useRoomModal } from "../util";
import { useEditRoomCommission } from "service/hotelRoom";
import { useEffect } from "react";

export const RoomModal = () => {
  const [form] = useForm();

  const { close, roomModalOpen, editingRoomId, editingRoom, error, isLoading } =
    useRoomModal();

  const {
    mutateAsync,
    error: submitError,
    isLoading: mutateLoading,
  } = useEditRoomCommission(useRoomListQueryKey());

  useEffect(() => {
    if (editingRoom) {
      form.setFieldsValue(editingRoom);
    }
  }, [editingRoom, form]);

  const submit = () => {
    form.validateFields().then(async () => {
      await mutateAsync({ id: +editingRoomId, ...form.getFieldsValue() });
      closeModal();
    });
  };

  const closeModal = () => {
    form.resetFields();
    close();
  };

  return (
    <Drawer
      title="房间详情"
      width={"100rem"}
      forceRender={true}
      onClose={close}
      open={roomModalOpen}
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
      extra={
        <Space>
          <Button onClick={closeModal}>取消</Button>
          <Button onClick={submit} loading={mutateLoading} type="primary">
            提交
          </Button>
        </Space>
      }
    >
      <ErrorBox error={error || submitError} />
      {isLoading ? (
        <ModalLoading />
      ) : (
        <>
          <Divider orientation="left">代言奖励</Divider>
          <Form form={form} layout="vertical">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="promotionCommissionRate"
                  label="代言奖励比例"
                  tooltip="佣金范围5%~20%"
                  rules={[{ required: true, message: "请填写代言奖励比例" }]}
                >
                  <InputNumber
                    min={5}
                    max={20}
                    style={{ width: "100%" }}
                    placeholder="请填写代言奖励比例"
                    suffix="%"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="promotionCommissionUpperLimit"
                  label="代言奖励上限"
                  tooltip="最高可设¥20"
                  rules={[{ required: true, message: "请填写代言奖励上限" }]}
                >
                  <InputNumber
                    max={20}
                    style={{ width: "100%" }}
                    placeholder="请填写代言奖励上限"
                    prefix="￥"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="superiorPromotionCommissionRate"
                  label="上级代言奖励比例"
                  tooltip="佣金范围5%~10%"
                  rules={[
                    { required: true, message: "请填写上级代言奖励比例" },
                  ]}
                >
                  <InputNumber
                    min={5}
                    max={10}
                    style={{ width: "100%" }}
                    placeholder="请填写上级代言奖励比例"
                    suffix="%"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="superiorPromotionCommissionUpperLimit"
                  label="上级代言奖励上限"
                  tooltip="最高可设¥10"
                  rules={[
                    { required: true, message: "请填写上级代言奖励上限" },
                  ]}
                >
                  <InputNumber
                    max={10}
                    style={{ width: "100%" }}
                    placeholder="请填写上级代言奖励上限"
                    prefix="￥"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>

          <Divider orientation="left">房间信息</Divider>
          <Descriptions size={"small"} column={2} bordered>
            <Descriptions.Item label="房间ID">
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
              <Tag color="success">{editingRoom?.hotelName}</Tag>
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
              {`${editingRoom?.salesCommissionRate}%`}
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

          <Divider orientation="left">店铺信息</Divider>
          <Descriptions size={"small"} column={2} bordered>
            <Descriptions.Item label="店铺ID">
              {editingRoom?.shopInfo?.id}
            </Descriptions.Item>
            <Descriptions.Item label="店铺头像">
              <Avatar
                src={editingRoom?.shopInfo?.logo}
                icon={<UserOutlined />}
                size="small"
              />
            </Descriptions.Item>
            <Descriptions.Item label="店铺名称">
              {editingRoom?.shopInfo?.name}
            </Descriptions.Item>
            <Descriptions.Item label="店铺类型">
              <Tag>
                {
                  [
                    { text: "酒店官方", value: 1 },
                    { text: "专营店", value: 2 },
                    { text: "平台自营", value: 3 },
                  ].find((item) => item.value === editingRoom?.shopInfo?.type)
                    ?.text
                }
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="注册时间">
              {dayjs(editingRoom?.shopInfo?.createdAt).format(
                "YYYY-MM-DD HH:mm:ss"
              )}
            </Descriptions.Item>
            <Descriptions.Item label="更新时间">
              {dayjs(editingRoom?.shopInfo?.updatedAt).format(
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
            <Descriptions.Item label="商家ID">
              {editingRoom?.merchantInfo?.id}
            </Descriptions.Item>
            <Descriptions.Item label="公司名称">
              {editingRoom?.merchantInfo?.companyName}
            </Descriptions.Item>
            <Descriptions.Item label="营业执照照片">
              <Image
                width={68}
                src={editingRoom?.merchantInfo?.businessLicensePhoto}
              />
            </Descriptions.Item>
            <Descriptions.Item label="公司地址">
              {editingRoom?.merchantInfo?.addressDetail}
            </Descriptions.Item>
            <Descriptions.Item label="联系人姓名">
              {editingRoom?.merchantInfo?.name}
            </Descriptions.Item>
            <Descriptions.Item label="联系人手机号">
              {editingRoom?.merchantInfo?.mobile}
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
