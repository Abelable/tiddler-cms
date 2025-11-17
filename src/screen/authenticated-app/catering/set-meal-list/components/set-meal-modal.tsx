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
  Avatar,
  Space,
  Button,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { ErrorBox, ModalLoading } from "components/lib";

import { useEffect } from "react";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";
import { useEditSetMealCommission } from "service/setMeal";
import { useSetMealListQueryKey, useSetMealModal } from "../util";

import type { DataOption } from "types/common";

export const SetMealModal = ({
  restaurantOptions,
}: {
  restaurantOptions: DataOption[];
}) => {
  const [form] = useForm();

  const {
    close,
    setMealModalOpen,
    editingSetMealId,
    editingSetMeal,
    error,
    isLoading,
  } = useSetMealModal();

  const {
    mutateAsync,
    error: submitError,
    isLoading: mutateLoading,
  } = useEditSetMealCommission(useSetMealListQueryKey());

  useEffect(() => {
    if (editingSetMeal) {
      form.setFieldsValue(editingSetMeal);
    }
  }, [editingSetMeal, form]);

  const submit = () => {
    form.validateFields().then(async () => {
      await mutateAsync({ id: +editingSetMealId, ...form.getFieldsValue() });
      closeModal();
    });
  };

  const closeModal = () => {
    form.resetFields();
    close();
  };

  return (
    <Drawer
      forceRender={true}
      title="套餐详情"
      width={"100rem"}
      onClose={closeModal}
      open={setMealModalOpen}
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
                  tooltip="佣金范围5%~30%"
                  rules={[{ required: true, message: "请填写代言奖励比例" }]}
                >
                  <InputNumber
                    min={5}
                    max={30}
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
                  tooltip="最高可设¥30"
                  rules={[{ required: true, message: "请填写代言奖励上限" }]}
                >
                  <InputNumber
                    max={30}
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

          <Divider orientation="left">套餐信息</Divider>
          <Descriptions size={"small"} column={2} bordered>
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
            <Descriptions.Item label="价格">
              {`¥${editingSetMeal?.price}`}
            </Descriptions.Item>
            <Descriptions.Item label="销售佣金比例">
              {`${editingSetMeal?.salesCommissionRate}%`}
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

          <Divider orientation="left">店铺信息</Divider>
          <Descriptions size={"small"} column={2} bordered>
            <Descriptions.Item label="店铺ID">
              {editingSetMeal?.shopInfo?.id}
            </Descriptions.Item>
            <Descriptions.Item label="店铺头像">
              <Avatar
                src={editingSetMeal?.shopInfo?.logo}
                icon={<UserOutlined />}
                size="small"
              />
            </Descriptions.Item>
            <Descriptions.Item label="店铺名称">
              {editingSetMeal?.shopInfo?.name}
            </Descriptions.Item>
            <Descriptions.Item label="店铺类型">
              <Tag>
                {
                  [
                    { text: "景点官方", value: 1 },
                    { text: "旅行社", value: 2 },
                    { text: "平台自营", value: 3 },
                  ].find(
                    (item) => item.value === editingSetMeal?.shopInfo?.type
                  )?.text
                }
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="注册时间">
              {dayjs(editingSetMeal?.shopInfo?.createdAt).format(
                "YYYY-MM-DD HH:mm:ss"
              )}
            </Descriptions.Item>
            <Descriptions.Item label="更新时间">
              {dayjs(editingSetMeal?.shopInfo?.updatedAt).format(
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
              {editingSetMeal?.merchantInfo?.id}
            </Descriptions.Item>
            <Descriptions.Item label="商家类型">
              <Tag>
                {editingSetMeal?.merchantInfo?.type === 1 ? "企业" : "个体"}
              </Tag>
            </Descriptions.Item>
            {editingSetMeal?.merchantInfo?.type === 1 ? (
              <>
                <Descriptions.Item label="公司名称">
                  {editingSetMeal?.merchantInfo?.companyName}
                </Descriptions.Item>
                <Descriptions.Item label="公司地址">
                  {editingSetMeal?.merchantInfo?.addressDetail}
                </Descriptions.Item>
              </>
            ) : (
              <></>
            )}
            <Descriptions.Item label="营业执照照片">
              <Image
                width={68}
                src={editingSetMeal?.merchantInfo?.businessLicensePhoto}
              />
            </Descriptions.Item>
            <Descriptions.Item label="卫生许可证照片">
              <Image
                width={68}
                src={editingSetMeal?.merchantInfo?.hygienicLicensePhoto}
              />
            </Descriptions.Item>
            <Descriptions.Item label="联系人姓名">
              {editingSetMeal?.merchantInfo?.name}
            </Descriptions.Item>
            <Descriptions.Item label="联系人手机号">
              {editingSetMeal?.merchantInfo?.mobile}
            </Descriptions.Item>
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
