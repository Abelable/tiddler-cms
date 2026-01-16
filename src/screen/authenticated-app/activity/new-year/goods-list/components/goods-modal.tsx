import { Form, InputNumber, Modal, Select } from "antd";
import { ErrorBox, OptionCover } from "components/lib";

import { useForm } from "antd/lib/form/Form";
import { useNewYearFilterGoodsOptions } from "service/goods";
import { useAddNewYearGoods } from "service/new-year/goods";
import { useNewYearGoodsModal, useNewYearGoodsListQueryKey } from "../util";

export const GoodsModal = () => {
  const [form] = useForm();
  const { newYearGoodsModalOpen, close } = useNewYearGoodsModal();

  const { data: goodsOptions = [], error: goodsOptionsError } =
    useNewYearFilterGoodsOptions();

  const {
    mutateAsync,
    isLoading: mutateLoading,
    error,
  } = useAddNewYearGoods(useNewYearGoodsListQueryKey());

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
      title="新增兑换商品"
      open={newYearGoodsModalOpen}
      confirmLoading={mutateLoading}
      onOk={confirm}
      onCancel={closeModal}
    >
      <ErrorBox error={error || goodsOptionsError} />
      <Form form={form} layout="vertical">
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
          name="luckScore"
          label="所需福气值"
          rules={[{ required: true, message: "请填写所需福气值" }]}
        >
          <InputNumber
            style={{ width: "100%" }}
            placeholder="请填写所需福气值"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
