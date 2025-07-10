import {
  Descriptions,
  Divider,
  Drawer,
  Tooltip,
  Tag,
  Image,
  Form,
  Row,
  Col,
  InputNumber,
  Space,
  Button,
  Avatar,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { ErrorBox, ModalLoading } from "components/lib";

import dayjs from "dayjs";
import { useForm } from "antd/es/form/Form";
import { useEditTicketCommission } from "service/scenicTicket";
import { useTicketListQueryKey, useTicketModal } from "../util";

import type { Option, DataOption } from "types/common";
import { useEffect } from "react";

export const TicketModal = ({
  typeOptions,
  scenicOptions,
}: {
  typeOptions: Option[];
  scenicOptions: DataOption[];
}) => {
  const [form] = useForm();
  const {
    close,
    ticketModalOpen,
    editingTicketId,
    editingTicket,
    error,
    isLoading,
  } = useTicketModal();

  const {
    mutateAsync,
    error: submitError,
    isLoading: mutateLoading,
  } = useEditTicketCommission(useTicketListQueryKey());

  useEffect(() => {
    if (editingTicket) {
      form.setFieldsValue(editingTicket);
    }
  }, [editingTicket, form]);

  const submit = () => {
    form.validateFields().then(async () => {
      await mutateAsync({ id: +editingTicketId, ...form.getFieldsValue() });
      closeModal();
    });
  };

  const closeModal = () => {
    form.resetFields();
    close();
  };

  return (
    <Drawer
      title="门票详情"
      width={"100rem"}
      forceRender={true}
      size={"large"}
      onClose={closeModal}
      open={ticketModalOpen}
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
          <Divider orientation="left">门票信息</Divider>
          <Descriptions size={"small"} column={2} bordered>
            <Descriptions.Item label="门票ID">
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
            <Descriptions.Item label="名称">
              {editingTicket?.name}
            </Descriptions.Item>
            <Descriptions.Item label="类型">
              <Tag>
                {
                  typeOptions.find((item) => item.value === editingTicket?.type)
                    ?.text
                }
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="关联景点">
              {editingTicket?.scenicIds?.length &&
                editingTicket?.scenicIds.map((id: number) => (
                  <Tag color="success" key={id}>
                    {scenicOptions.find((item) => item.id === id)?.name}
                  </Tag>
                ))}
            </Descriptions.Item>
            <Descriptions.Item label="价格">
              {`¥${editingTicket?.price}起`}
            </Descriptions.Item>
            <Descriptions.Item label="销售佣金比例">
              {`${editingTicket?.salesCommissionRate}%`}
            </Descriptions.Item>
            <Descriptions.Item label="销量">
              {editingTicket?.salesVolume}
            </Descriptions.Item>
            <Descriptions.Item label="创建时间">
              {dayjs(editingTicket?.createdAt).format("YYYY-MM-DD HH:mm:ss")}
            </Descriptions.Item>
            <Descriptions.Item label="更新时间">
              {dayjs(editingTicket?.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
            </Descriptions.Item>
          </Descriptions>

          <Divider orientation="left">店铺信息</Divider>
          <Descriptions size={"small"} column={2} bordered>
            <Descriptions.Item label="店铺ID">
              {editingTicket?.shopInfo?.id}
            </Descriptions.Item>
            <Descriptions.Item label="店铺头像">
              <Avatar
                src={editingTicket?.shopInfo?.logo}
                icon={<UserOutlined />}
                size="small"
              />
            </Descriptions.Item>
            <Descriptions.Item label="店铺名称">
              {editingTicket?.shopInfo?.name}
            </Descriptions.Item>
            <Descriptions.Item label="店铺类型">
              <Tag>
                {
                  [
                    { text: "景点官方", value: 1 },
                    { text: "旅行社", value: 2 },
                    { text: "平台自营", value: 3 },
                  ].find((item) => item.value === editingTicket?.shopInfo?.type)
                    ?.text
                }
              </Tag>
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

          <Divider orientation="left">服务商信息</Divider>
          <Descriptions
            style={{ marginBottom: "3.2rem" }}
            size={"small"}
            column={2}
            bordered
          >
            <Descriptions.Item label="服务商ID">
              {editingTicket?.merchantInfo?.id}
            </Descriptions.Item>
            <Descriptions.Item label="公司名称">
              {editingTicket?.merchantInfo?.companyName}
            </Descriptions.Item>
            <Descriptions.Item label="营业执照照片">
              <Image
                width={68}
                src={editingTicket?.merchantInfo?.businessLicensePhoto}
              />
            </Descriptions.Item>
            <Descriptions.Item label="公司地址">
              {editingTicket?.merchantInfo?.addressDetail}
            </Descriptions.Item>
            <Descriptions.Item label="联系人姓名">
              {editingTicket?.merchantInfo?.name}
            </Descriptions.Item>
            <Descriptions.Item label="联系人手机号">
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
