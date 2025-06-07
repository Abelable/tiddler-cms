import { Form, Modal, Select, Tag } from "antd";
import { UserOutlined } from "@ant-design/icons";

import { useForm } from "antd/lib/form/Form";
import { useBindSuperior } from "service/user";
import { useBindModal, useUsersQueryKey } from "../util";

import type { PromoterOption } from "types/promoter";
import {
  ErrorBox,
  ModalLoading,
  OptionAvatar,
  OptionNickname,
} from "components/lib";
import { useEffect } from "react";

export const BindModal = ({
  superiorOptions,
}: {
  superiorOptions: PromoterOption[];
}) => {
  const [form] = useForm();
  const { bindModalOpen, bindUserInfo, error, isLoading, close } =
    useBindModal();

  const { mutateAsync, isLoading: mutateLoading } = useBindSuperior(
    useUsersQueryKey()
  );

  useEffect(() => {
    if (bindUserInfo?.superiorId) {
      form.setFieldsValue({
        superiorId: bindUserInfo?.superiorId,
      });
    }
  }, [bindUserInfo?.superiorId, form]);

  const confirm = () => {
    form.validateFields().then(async () => {
      await mutateAsync({
        userId: bindUserInfo?.id,
        ...form.getFieldsValue(),
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
      title={bindUserInfo?.superiorId ? "更新上级" : "绑定上级"}
      open={bindModalOpen}
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
            name="superiorId"
            label="上级"
            rules={[{ required: true, message: "请选择上级" }]}
          >
            <Select
              placeholder="请选择上级"
              showSearch
              filterOption={(input, option) =>
                (option!.children as any)[1].props.children
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            >
              {superiorOptions.map(({ id, avatar, nickname, level }) => (
                <Select.Option key={id} value={id}>
                  <OptionAvatar src={avatar} icon={<UserOutlined />} />
                  <OptionNickname maxWidth="6.8rem">{nickname}</OptionNickname>
                  <Tag color={["green", "blue", "gold", "magenta"][level - 1]}>
                    {["Lv.1", "Lv.2", "Lv.3", "Lv.4"][level - 1]}
                  </Tag>
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};
