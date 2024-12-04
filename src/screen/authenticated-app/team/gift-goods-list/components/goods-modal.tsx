import { Form, Modal, Select } from "antd";
import { ErrorBox, GoodsCover } from "components/lib";

import { useForm } from "antd/lib/form/Form";
import { useSelfGoodsOptions } from "service/goods";
import { useAddGiftGoods } from "service/giftGoods";
import { useGiftGoodsModal, useGiftGoodsListQueryKey } from "../util";

import type { Option } from "types/common";

export const GoodsModal = ({ typeOptions }: { typeOptions: Option[] }) => {
  const [form] = useForm();
  const { giftGoodsModalOpen, close } = useGiftGoodsModal();

  const { data: goodsOptions = [], error: goodsOptionsError } =
    useSelfGoodsOptions();

  const {
    mutateAsync,
    isLoading: mutateLoading,
    error,
  } = useAddGiftGoods(useGiftGoodsListQueryKey());

  const confirm = () => {
    form.validateFields().then(async () => {
      await mutateAsync({ type: 2, ...form.getFieldsValue() });
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
      title="新增礼包商品"
      open={giftGoodsModalOpen}
      confirmLoading={mutateLoading}
      onOk={confirm}
      onCancel={closeModal}
    >
      <ErrorBox error={error || goodsOptionsError} />
      <Form form={form} layout="vertical">
        <Form.Item
          name="type"
          label="礼包类型"
          rules={[{ required: true, message: "请选择礼包类型" }]}
        >
          <Select placeholder="请选择礼包类型">
            {typeOptions.map(({ text, value }) => (
              <Select.Option key={value} value={value}>
                {text}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="goodsIds"
          label="商品"
          rules={[{ required: true, message: "请选择商品" }]}
        >
          <Select
            mode="multiple"
            showSearch
            filterOption={(input, option) =>
              (option!.children as any)[1].props.children
                .toLowerCase()
                .includes(input.toLowerCase())
            }
            placeholder="请选择商品"
          >
            {goodsOptions.map(({ id, cover, name }) => (
              <Select.Option key={id} value={id}>
                <GoodsCover src={cover} />
                <span>{name}</span>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};
