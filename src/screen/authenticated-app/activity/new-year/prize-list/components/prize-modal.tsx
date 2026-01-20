import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Space,
  Select,
  InputNumber,
  DatePicker,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox, ModalLoading } from "components/lib";
import { OssUpload } from "components/oss-upload";

import { useEffect } from "react";
import { useAddPrize, useEditPrize } from "service/new-year/prize";
import dayjs from "dayjs";
import { usePrizeModal, usePrizeListQueryKey } from "../util";

import type { Option } from "types/common";

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
      const { cover, startAt, endAt, ...rest } = editingPrize;
      form.setFieldsValue({
        cover: cover ? [{ url: cover }] : [],
        startAt: startAt ? dayjs(startAt) : null,
        endAt: endAt ? dayjs(endAt) : null,
        ...rest,
      });
    }
  }, [editingPrize, form]);

  const submit = () => {
    form.validateFields().then(async () => {
      const { cover, startAt, endAt, ...rest } = form.getFieldsValue();
      await mutateAsync({
        ...editingPrize,
        ...rest,
        cover: cover && cover.length ? cover[0].url : "",
        startAt: startAt ? startAt.toISOString() : null,
        endAt: endAt ? endAt.toISOString() : null,
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
      forceRender
      title={editingPrizeId ? "编辑奖品" : "新增奖品"}
      size="large"
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
                name="isBig"
                label="是否是大奖"
                rules={[{ required: true, message: "请选择是否是大奖" }]}
              >
                <Select placeholder="请选择是否是大奖">
                  {[
                    { name: "是", value: 1 },
                    { name: "否", value: 0 },
                  ].map((item) => (
                    <Select.Option key={item.value} value={item.value}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="couponId" label="优惠券Id">
                <InputNumber
                  style={{ width: "100%" }}
                  placeholder="请输入优惠券Id"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="goodsId" label="商品Id">
                <InputNumber
                  style={{ width: "100%" }}
                  placeholder="请输入商品Id"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="rate"
                label="抽奖概率"
                rules={[{ required: true }]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  min={0}
                  max={1}
                  step={0.001}
                  placeholder="请输入抽奖概率 (0~1)"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="stock" label="库存" rules={[{ required: true }]}>
                <InputNumber
                  style={{ width: "100%" }}
                  min={-1}
                  placeholder="-1 表示不限"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="luckScore" label="福气值">
                <InputNumber
                  style={{ width: "100%" }}
                  min={0}
                  placeholder="仅 type=1 有效"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="cost" label="单次成本">
                <InputNumber
                  style={{ width: "100%" }}
                  min={0}
                  placeholder="请输入单次真实成本"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="limitPerUser" label="单用户中奖次数限制">
                <InputNumber
                  style={{ width: "100%" }}
                  min={0}
                  placeholder="0 不限制"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="fallbackPrizeId" label="降级奖品ID">
                <InputNumber
                  style={{ width: "100%" }}
                  min={0}
                  placeholder="库存不足时降级使用"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="startAt" label="开始时间">
                <DatePicker
                  showTime
                  style={{ width: "100%" }}
                  placeholder="请选择开始时间"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="endAt" label="结束时间">
                <DatePicker
                  showTime
                  style={{ width: "100%" }}
                  placeholder="请选择结束时间"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="sort" label="排序">
                <InputNumber
                  style={{ width: "100%" }}
                  min={0}
                  placeholder="排序值越小越靠前"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="status" label="状态">
                <Select placeholder="请选择状态">
                  <Select.Option value={1}>上架中</Select.Option>
                  <Select.Option value={2}>已下架</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      )}
    </Drawer>
  );
};
