import { Form, Input, InputNumber, Modal } from "antd";

import { useEffect, useState } from "react";
import { useForm } from "antd/lib/form/Form";
import { useApproveGoods } from "service/goods";
import { useApproveModal, useGoodsListQueryKey } from "../util";

import type { GoodsCategory } from "types/goodsCategory";

export const ApproveModal = ({
  goodsCategoryOptions,
}: {
  goodsCategoryOptions: GoodsCategory[];
}) => {
  const [form] = useForm();
  const [goodsCategory, setGoodsCategory] = useState<GoodsCategory>();
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
      title="商品审核通过确认"
      open={approveModalOpen}
      confirmLoading={mutateLoading}
      onOk={confirm}
      onCancel={closeModal}
    >
      <div>请确保在商品信息无误的情况下进行该操作</div>
      <Form form={form} layout="vertical">
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
      </Form>
    </Modal>
  );
};
