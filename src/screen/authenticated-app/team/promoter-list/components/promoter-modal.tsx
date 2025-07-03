import { Form, InputNumber, Modal, Select } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { ErrorBox, ModalLoading, OptionAvatar } from "components/lib";

import { useEffect } from "react";
import { useForm } from "antd/lib/form/Form";
import { useAddPromoter, useChangeLevel } from "service/promoter";
import { usePromoterModal, usePromoterListQueryKey } from "../util";

export const PromoterModal = ({
  userOptions,
  levelOptions,
}: {
  userOptions: { id: number; avatar: string; nickname: string }[];
  levelOptions: { text: string; value: number; scene: number }[];
}) => {
  const [form] = useForm();
  const {
    promoterModalOpen,
    editingPromoterId,
    editingPromoter,
    isLoading,
    close,
  } = usePromoterModal();

  const useMutationPromoter = editingPromoterId
    ? useChangeLevel
    : useAddPromoter;
  const {
    mutateAsync,
    isLoading: mutateLoading,
    error,
  } = useMutationPromoter(usePromoterListQueryKey());

  useEffect(() => {
    if (editingPromoter) {
      form.setFieldsValue({
        level: editingPromoter.level,
      });
    }
  }, [editingPromoter, form]);

  const confirm = () => {
    form.validateFields().then(async () => {
      const { level, ...rest } = form.getFieldsValue();
      const scene = levelOptions.find((item) => item.value === level)?.scene;
      await mutateAsync({
        ...editingPromoter,
        ...rest,
        level,
        scene,
      });
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
      title="新增家乡代言人"
      open={promoterModalOpen}
      confirmLoading={mutateLoading}
      onOk={confirm}
      onCancel={closeModal}
    >
      <ErrorBox error={error} />
      {isLoading ? (
        <ModalLoading />
      ) : (
        <Form form={form} layout="vertical">
          {editingPromoterId ? (
            <></>
          ) : (
            <Form.Item
              name="userId"
              label="用户"
              rules={[{ required: true, message: "请选择用户" }]}
            >
              <Select
                placeholder="请选择用户"
                showSearch
                filterOption={(input, option) =>
                  (option!.children as any)[1].props.children
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              >
                {userOptions.map(({ id, avatar, nickname }) => (
                  <Select.Option key={id} value={id}>
                    <OptionAvatar src={avatar} icon={<UserOutlined />} />
                    <span>{nickname}</span>
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          )}

          <Form.Item
            name="level"
            label="家乡代言人身份"
            rules={[{ required: true, message: "请选择家乡代言人身份" }]}
          >
            <Select placeholder="请选择家乡代言人身份">
              {levelOptions.map((item) => (
                <Select.Option key={item.value} value={item.value}>
                  {item.text}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="duration"
            label="代言时长（天）"
            rules={[{ required: true, message: "请填写代言时长" }]}
          >
            <InputNumber
              style={{ width: "100%" }}
              placeholder="请填写代言时长"
            />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};
