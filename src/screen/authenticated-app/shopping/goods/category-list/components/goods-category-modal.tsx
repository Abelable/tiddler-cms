import { Form, Input, InputNumber, Select, Modal, Space } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox, ModalLoading } from "components/lib";

import { useEffect } from "react";
import {
  useAddGoodsCategory,
  useEditGoodsCategory,
} from "service/goodsCategory";
import { useGoodsCategoryModal, useGoodsCategoriesQueryKey } from "../util";

import type { DataOption } from "types/common";

export const GoodsCategoryModal = ({
  shopCategoryOptions,
}: {
  shopCategoryOptions: DataOption[];
}) => {
  const [form] = useForm();
  const {
    goodsCategoryModalOpen,
    editingGoodsCategory,
    editingGoodsCategoryId,
    isLoading,
    close,
  } = useGoodsCategoryModal();

  const useMutateRole = editingGoodsCategoryId
    ? useEditGoodsCategory
    : useAddGoodsCategory;
  const {
    mutateAsync,
    isLoading: mutateLoading,
    error,
  } = useMutateRole(useGoodsCategoriesQueryKey());

  useEffect(() => {
    form.setFieldsValue(editingGoodsCategory);
  }, [editingGoodsCategory, form]);

  const confirm = () => {
    form.validateFields().then(async () => {
      await mutateAsync({ ...editingGoodsCategory, ...form.getFieldsValue() });
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
      title={editingGoodsCategoryId ? "编辑商品分类" : "新增商品分类"}
      open={goodsCategoryModalOpen}
      confirmLoading={mutateLoading}
      onOk={confirm}
      onCancel={closeModal}
    >
      <ErrorBox error={error} />
      {isLoading ? (
        <ModalLoading />
      ) : (
        <Form form={form} layout="vertical">
          <Form.Item
            label="商品分类名称"
            name="name"
            rules={[{ required: true, message: "请输入商品分类名称" }]}
          >
            <Input placeholder={"请输入商品分类名称"} />
          </Form.Item>
          <Form.Item
            name="shopCategoryId"
            label="所属店铺分类"
            rules={[{ required: true, message: "请选择所属店铺分类" }]}
          >
            <Select placeholder="请选择所属店铺分类">
              {shopCategoryOptions.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="销售佣金比例范围" required>
            <Space.Compact>
              <Form.Item
                style={{ marginBottom: 0, width: "46%" }}
                name="minSalesCommissionRate"
                rules={[{ required: true, message: "请输入最小比例" }]}
              >
                <InputNumber
                  style={{ width: "100%", textAlign: "center" }}
                  placeholder="请输入最小比例"
                  suffix="%"
                />
              </Form.Item>
              <Input
                style={{
                  width: "8%",
                  height: "32px",
                  borderLeft: 0,
                  borderRight: 0,
                  pointerEvents: "none",
                  textAlign: "center",
                  backgroundColor: "#fff",
                }}
                placeholder="~"
                disabled
              />
              <Form.Item
                style={{ marginBottom: 0, width: "46%" }}
                name="maxSalesCommissionRate"
                rules={[{ required: true, message: "请输入最大比例" }]}
              >
                <InputNumber
                  style={{
                    width: "100%",
                    textAlign: "center",
                  }}
                  placeholder="请输入最大比例"
                  suffix="%"
                />
              </Form.Item>
            </Space.Compact>
          </Form.Item>
          <Form.Item label="代言奖励比例范围" required>
            <Space.Compact>
              <Form.Item
                style={{ marginBottom: 0, width: "46%" }}
                name="minPromotionCommissionRate"
                rules={[{ required: true, message: "请输入最小比例" }]}
              >
                <InputNumber
                  style={{ width: "100%", textAlign: "center" }}
                  placeholder="请输入最小比例"
                  suffix="%"
                />
              </Form.Item>
              <Input
                style={{
                  width: "8%",
                  height: "32px",
                  borderLeft: 0,
                  borderRight: 0,
                  pointerEvents: "none",
                  textAlign: "center",
                  backgroundColor: "#fff",
                }}
                placeholder="~"
                disabled
              />
              <Form.Item
                style={{ marginBottom: 0, width: "46%" }}
                name="maxPromotionCommissionRate"
                rules={[{ required: true, message: "请输入最大比例" }]}
              >
                <InputNumber
                  style={{
                    width: "100%",
                    textAlign: "center",
                  }}
                  placeholder="请输入最大比例"
                  suffix="%"
                />
              </Form.Item>
            </Space.Compact>
          </Form.Item>
          <Form.Item
            label="代言奖励上限"
            name="promotionCommissionUpperLimit"
            rules={[{ required: true, message: "请输入代言奖励上限" }]}
          >
            <InputNumber
              style={{ width: "100%" }}
              placeholder={"请输入代言奖励上限"}
              prefix="￥"
            />
          </Form.Item>
          <Form.Item label="上级代言奖励比例范围" required>
            <Space.Compact>
              <Form.Item
                style={{ marginBottom: 0, width: "46%" }}
                name="minSuperiorPromotionCommissionRate"
                rules={[{ required: true, message: "请输入最小比例" }]}
              >
                <InputNumber
                  style={{ width: "100%", textAlign: "center" }}
                  placeholder="请输入最小比例"
                  suffix="%"
                />
              </Form.Item>
              <Input
                style={{
                  width: "8%",
                  height: "32px",
                  borderLeft: 0,
                  borderRight: 0,
                  pointerEvents: "none",
                  textAlign: "center",
                  backgroundColor: "#fff",
                }}
                placeholder="~"
                disabled
              />
              <Form.Item
                style={{ marginBottom: 0, width: "46%" }}
                name="maxSuperiorPromotionCommissionRate"
                rules={[{ required: true, message: "请输入最大比例" }]}
              >
                <InputNumber
                  style={{
                    width: "100%",
                    textAlign: "center",
                  }}
                  placeholder="请输入最大比例"
                  suffix="%"
                />
              </Form.Item>
            </Space.Compact>
          </Form.Item>
          <Form.Item
            label="上级代言奖励上限"
            name="superiorPromotionCommissionUpperLimit"
            rules={[{ required: true, message: "请输入上级代言奖励上限" }]}
          >
            <InputNumber
              style={{ width: "100%" }}
              placeholder={"请输入上级代言奖励上限"}
              prefix="￥"
            />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};
