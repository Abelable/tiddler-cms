import { Form, InputNumber, Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";

import { useForm } from "antd/lib/form/Form";
import { useApproveRoom } from "service/hotelRoom";
import { useApproveModal, useRoomListQueryKey } from "../util";

import { Row } from "components/lib";

export const ApproveModal = () => {
  const [form] = useForm();
  const { approveModalOpen, approveRoomId, close } = useApproveModal();
  const { mutateAsync, isLoading: mutateLoading } = useApproveRoom(
    useRoomListQueryKey()
  );

  const confirm = () => {
    form.validateFields().then(async () => {
      await mutateAsync({ id: +approveRoomId, ...form.getFieldsValue() });
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
          <span>房间审核通过确认</span>
        </Row>
      }
      open={approveModalOpen}
      confirmLoading={mutateLoading}
      onOk={confirm}
      onCancel={closeModal}
    >
      <div style={{ marginBottom: "2.4rem", paddingLeft: "3.2rem" }}>
        请确保在房间信息无误的情况下进行该操作
      </div>
      <Form form={form} layout="vertical">
        <Form.Item
          name="promotionCommissionRate"
          label="代言奖励比例"
          tooltip="佣金范围5%~20%"
          rules={[{ required: true, message: "请填写代言奖励比例" }]}
        >
          <InputNumber
            min={5}
            max={20}
            style={{ width: "100%" }}
            placeholder="请填写代言奖励比例"
            suffix="%"
          />
        </Form.Item>
        <Form.Item
          name="promotionCommissionUpperLimit"
          label="代言奖励上限"
          tooltip={`最高可设¥20`}
          rules={[{ required: true, message: "请填写代言奖励上限" }]}
        >
          <InputNumber
            max={20}
            style={{ width: "100%" }}
            placeholder="请填写代言奖励上限"
            prefix="￥"
          />
        </Form.Item>
        <Form.Item
          name="superiorPromotionCommissionRate"
          label="上级代言奖励比例"
          tooltip="佣金范围5%~10%"
          rules={[{ required: true, message: "请填写上级代言奖励比例" }]}
        >
          <InputNumber
            min={5}
            max={10}
            style={{ width: "100%" }}
            placeholder="请填写上级代言奖励比例"
            suffix="%"
          />
        </Form.Item>
        <Form.Item
          name="superiorPromotionCommissionUpperLimit"
          label="上级代言奖励上限"
          tooltip="最高可设¥10"
          rules={[{ required: true, message: "请填写上级代言奖励上限" }]}
        >
          <InputNumber
            max={10}
            style={{ width: "100%" }}
            placeholder="请填写上级代言奖励上限"
            prefix="￥"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
