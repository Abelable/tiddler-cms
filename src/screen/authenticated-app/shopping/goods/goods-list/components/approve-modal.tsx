import { Form, InputNumber, Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";

import { useEffect, useState } from "react";
import { useForm } from "antd/lib/form/Form";
import { useApproveGoods } from "service/goods";
import { useApproveModal, useGoodsListQueryKey } from "../util";

import type { GoodsCategoryOption } from "types/goodsCategory";
import { Row } from "components/lib";

export const ApproveModal = ({
  goodsCategoryOptions,
}: {
  goodsCategoryOptions: GoodsCategoryOption[];
}) => {
  const [form] = useForm();
  const [goodsCategory, setGoodsCategory] = useState<GoodsCategoryOption>();
  const { approveModalOpen, editingGoods, approveGoodsId, close } =
    useApproveModal();
  const { mutateAsync, isLoading: mutateLoading } = useApproveGoods(
    useGoodsListQueryKey()
  );

  useEffect(() => {
    setGoodsCategory(
      goodsCategoryOptions.find((item) => item.id === editingGoods?.categoryId)
    );
  }, [editingGoods?.categoryId, goodsCategoryOptions]);

  const confirm = () => {
    form.validateFields().then(async () => {
      await mutateAsync({ id: +approveGoodsId, ...form.getFieldsValue() });
      closeModal();
    });
  };

  const closeModal = () => {
    form.resetFields();
    close();
  };

  return (
    <Modal
      forceRender={true}
      title={
        <Row gap={1}>
          <ExclamationCircleFilled
            style={{ color: "#faad14", fontSize: "2.2rem" }}
          />
          <span>商品审核通过确认</span>
        </Row>
      }
      open={approveModalOpen}
      confirmLoading={mutateLoading}
      onOk={confirm}
      onCancel={closeModal}
    >
      <div style={{ marginBottom: "2.4rem", paddingLeft: "3.2rem" }}>
        请确保在商品信息无误的情况下进行该操作
      </div>
      <Form form={form} layout="vertical">
        <Form.Item
          name="promotionCommissionRate"
          label="代言奖励比例"
          tooltip={`奖励范围${goodsCategory?.minPromotionCommissionRate}%~${goodsCategory?.maxPromotionCommissionRate}%`}
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
        <Form.Item
          name="superiorPromotionCommissionRate"
          label="上级代言奖励比例"
          tooltip={`奖励范围${goodsCategory?.minSuperiorPromotionCommissionRate}%~${goodsCategory?.maxSuperiorPromotionCommissionRate}%`}
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
      </Form>
    </Modal>
  );
};
