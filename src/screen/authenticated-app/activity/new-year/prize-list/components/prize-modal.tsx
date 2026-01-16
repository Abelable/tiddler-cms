import { Button, Col, Drawer, Form, Input, Row, Space, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox, ModalLoading } from "components/lib";
import { OssUpload } from "components/oss-upload";

import { useEffect } from "react";
import { useAddPrize, useEditPrize } from "service/new-year/prize";
import { usePrizeModal, usePrizeListQueryKey } from "../util";

import type { Option } from "types/common";
import { InputNumber } from "antd/lib";

const normFile = (e: any) => {
  if (Array.isArray(e)) return e;
  return e && e.fileList;
};

export const PrizeModal = ({ typeOptions }: { typeOptions: Option[] }) => {
  const [form] = useForm();
  const { prizeModalOpen, editingPrizeId, editingPrize, isLoading, close } =
    usePrizeModal();

  const useMutatePrize = editingPrizeId ? useEditPrize : useAddPrize;
  const {
    mutateAsync,
    isLoading: mutateLoading,
    error,
  } = useMutatePrize(usePrizeListQueryKey());

  useEffect(() => {
    if (editingPrize) {
      const { cover, ...rest } = editingPrize;
      form.setFieldsValue({ cover: cover ? [{ url: cover }] : [], ...rest });
    }
  }, [editingPrize, form]);

  const submit = () => {
    form.validateFields().then(async () => {
      const { cover, ...rest } = form.getFieldsValue();
      await mutateAsync({
        ...editingPrize,
        ...rest,
        cover: cover && cover.length ? cover[0].url : "",
      });
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
      title={editingPrizeId ? "编辑奖品" : "新增奖品"}
      size={"large"}
      onClose={closeModal}
      open={prizeModalOpen}
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
      <ErrorBox error={error} />
      {isLoading ? (
        <ModalLoading />
      ) : (
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="cover"
                label="图片"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                rules={[{ required: true, message: "请上传图片" }]}
              >
                <OssUpload maxCount={1} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="name"
                label="名称"
                rules={[{ required: true, message: "请输入名称" }]}
              >
                <Input placeholder="请输入名称" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="type"
                label="类型"
                rules={[{ required: true, message: "请选择类型" }]}
              >
                <Select placeholder="请选择类型">
                  {typeOptions.map((item) => (
                    <Select.Option key={item.value} value={item.value}>
                      {item.text}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="couponId"
                label="优惠券Id"
                rules={[{ required: true, message: "请输入优惠券Id" }]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  placeholder="请输入优惠券Id"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="goodsId"
                label="商品Id"
                rules={[{ required: true, message: "请输入商品Id" }]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  placeholder="请输入商品Id"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="isBig"
                label="是否是大奖"
                rules={[{ required: true, message: "请选择是否是大奖" }]}
              >
                <Select placeholder="请选择是否是大奖">
                  {[
                    { name: "否", value: 0 },
                    { name: "是", value: 1 },
                  ].map((item) => (
                    <Select.Option key={item.value} value={item.value}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      )}
    </Drawer>
  );
};
