import {
  Descriptions,
  Divider,
  Drawer,
  Image,
  Avatar,
  Tooltip,
  Tag,
  Row,
  Col,
  Form,
  InputNumber,
  Space,
  Button,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { ErrorBox, ModalLoading } from "components/lib";

import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";
import { useGoodsDetailModal, useGoodsListQueryKey } from "../util";

import type { DataOption } from "types/common";
import type { GoodsCategoryOption } from "types/goodsCategory";
import { useEditGoodsCommission } from "service/goods";

export const DetailModal = ({
  shopCategoryOptions,
  goodsCategoryOptions,
}: {
  shopCategoryOptions: DataOption[];
  goodsCategoryOptions: GoodsCategoryOption[];
}) => {
  const [form] = useForm();
  const [goodsCategory, setGoodsCategory] = useState<
    GoodsCategoryOption | undefined
  >();
  const { close, goodsModalOpen, editingGoods, error, isLoading } =
    useGoodsDetailModal();
  const {
    mutateAsync,
    error: submitError,
    isLoading: mutateLoading,
  } = useEditGoodsCommission(useGoodsListQueryKey());

  useEffect(() => {
    if (editingGoods) {
      setGoodsCategory(
        goodsCategoryOptions.find(
          (item) => item.id === editingGoods?.categoryId
        )
      );
      form.setFieldsValue(editingGoods);
    }
  }, [editingGoods, editingGoods?.categoryId, form, goodsCategoryOptions]);

  const submit = () => {
    form.validateFields().then(async () => {
      await mutateAsync(form.getFieldsValue());
      closeModal();
    });
  };

  const closeModal = () => {
    form.resetFields();
    setGoodsCategory(undefined);
    close();
  };

  return (
    <Drawer
      forceRender={true}
      title="商品详情"
      width={"100rem"}
      onClose={close}
      open={goodsModalOpen}
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
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="promotionCommissionRate"
                label="代言奖励比例"
                tooltip={`佣金范围${goodsCategory?.minPromotionCommissionRate}%~${goodsCategory?.maxPromotionCommissionRate}%`}
                rules={[{ required: true, message: "请填写代言奖励比例" }]}
              >
                <InputNumber
                  min={goodsCategory?.minPromotionCommissionRate}
                  max={goodsCategory?.maxPromotionCommissionRate}
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
                tooltip={`最高可设¥${goodsCategory?.promotionCommissionUpperLimit}`}
                rules={[{ required: true, message: "请填写代言奖励上限" }]}
              >
                <InputNumber
                  max={goodsCategory?.promotionCommissionUpperLimit}
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
                tooltip={`佣金范围${goodsCategory?.minSuperiorPromotionCommissionRate}%~${goodsCategory?.maxSuperiorPromotionCommissionRate}%`}
                rules={[{ required: true, message: "请填写上级代言奖励比例" }]}
              >
                <InputNumber
                  min={goodsCategory?.minSuperiorPromotionCommissionRate}
                  max={goodsCategory?.maxSuperiorPromotionCommissionRate}
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
                tooltip={`最高可设¥${goodsCategory?.superiorPromotionCommissionUpperLimit}`}
                rules={[{ required: true, message: "请填写上级代言奖励上限" }]}
              >
                <InputNumber
                  max={goodsCategory?.superiorPromotionCommissionUpperLimit}
                  style={{ width: "100%" }}
                  placeholder="请填写上级代言奖励上限"
                  prefix="￥"
                />
              </Form.Item>
            </Col>
          </Row>
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
            <Descriptions.Item label="代言奖励比例">
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
