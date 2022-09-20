import { Button, Col, Drawer, Form, Input, Row, Space } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox, ModalLoading } from "components/lib";
import { useAddAdmin } from "service/admin";
import { useAdminModal, useAdminsQueryKey } from "../util";
import { useEditAdmin } from "service/admin";
import { useEffect } from "react";
import { OssUpload } from "components/oss-upload";

const normFile = (e: any) => {
  if (Array.isArray(e)) return e;
  return e && e.fileList;
};

export const AdminModal = () => {
  const [form] = useForm();
  const { adminModalOpen, editingAdminId, editingAdmin, isLoading, close } =
    useAdminModal();

  const useMutateAdmin = editingAdminId ? useEditAdmin : useAddAdmin;
  const {
    mutateAsync,
    isLoading: mutateLoading,
    error,
  } = useMutateAdmin(useAdminsQueryKey());

  useEffect(() => {
    form.setFieldsValue(editingAdmin);
  }, [editingAdmin, form]);

  const confirm = () => {
    form.validateFields().then(async () => {
      await mutateAsync({ ...editingAdmin, ...form.getFieldsValue() });
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
      title={editingAdminId ? "编辑管理员" : "新增管理员"}
      size={"large"}
      onClose={closeModal}
      open={adminModalOpen}
      bodyStyle={{ paddingBottom: 80 }}
      extra={
        <Space>
          <Button onClick={closeModal}>取消</Button>
          <Button onClick={confirm} loading={mutateLoading} type="primary">
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
                name="avatar"
                label="管理员头像"
                tooltip="图片大小不能超过10MB"
                valuePropName="fileList"
                getValueFromEvent={normFile}
              >
                <OssUpload maxCount={1} />
              </Form.Item>
            </Col>
          </Row>
          {editingAdminId ? (
            <></>
          ) : (
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="account"
                  label="管理员账号"
                  rules={[{ required: true, message: "请输入管理员账号" }]}
                >
                  <Input placeholder="请输入管理员账号" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="password"
                  label="管理员账号密码"
                  rules={[{ required: true, message: "请输入管理员账号密码" }]}
                >
                  <Input placeholder="请输入管理员账号密码" />
                </Form.Item>
              </Col>
            </Row>
          )}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="nickname"
                label="管理员昵称"
                rules={[{ required: true, message: "请输入管理员昵称" }]}
              >
                <Input placeholder="请输入管理员昵称" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      )}
    </Drawer>
  );
};
