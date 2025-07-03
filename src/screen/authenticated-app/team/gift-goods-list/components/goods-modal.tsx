import { Form, InputNumber, Modal, Select } from "antd";
import { ErrorBox, OptionCover } from "components/lib";

import { useForm } from "antd/lib/form/Form";
import { useNormalGoodsOptions } from "service/goods";
import { useAddGiftGoods } from "service/giftGoods";
import { useGiftGoodsModal, useGiftGoodsListQueryKey } from "../util";

import type { DataOption } from "types/common";

export const GoodsModal = ({ typeOptions }: { typeOptions: DataOption[] }) => {
  const [form] = useForm();
  const { giftGoodsModalOpen, close } = useGiftGoodsModal();

  const { data: goodsOptions = [], error: goodsOptionsError } =
    useNormalGoodsOptions();

  const {
    mutateAsync,
    isLoading: mutateLoading,
    error,
  } = useAddGiftGoods(useGiftGoodsListQueryKey());

  const confirm = () => {
    form.validateFields().then(async () => {
      await mutateAsync(form.getFieldsValue());
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
      title="新增家乡好物"
      open={giftGoodsModalOpen}
      confirmLoading={mutateLoading}
      onOk={confirm}
      onCancel={closeModal}
    >
      <ErrorBox error={error || goodsOptionsError} />
      <Form form={form} layout="vertical">
        <Form.Item
          name="typeId"
          label="好物类型"
          rules={[{ required: true, message: "请选择好物类型" }]}
        >
          <Select placeholder="请选择好物类型">
            {typeOptions.map(({ id, name }) => (
              <Select.Option key={id} value={id}>
                {name}
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
                <OptionCover src={cover} />
                <span>{name}</span>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="duration"
          label="代言时长（天）"
          rules={[{ required: true, message: "请填写代言时长" }]}
        >
          <InputNumber style={{ width: "100%" }} placeholder="请填写代言时长" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
