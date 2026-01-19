import { Button, Col, Drawer, Form, Input, Row, Space, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox, ModalLoading } from "components/lib";
import { OssUpload } from "components/oss-upload";

import { useEffect } from "react";
import { useAddTask, useEditTask } from "service/new-year/task";
import { useTaskModal, useTaskListQueryKey } from "../util";

import type { Option } from "types/common";
import { InputNumber } from "antd/lib";

const normFile = (e: any) => {
  if (Array.isArray(e)) return e;
  return e && e.fileList;
};

export const TaskModal = ({
  typeOptions,
  sceneOptions,
}: {
  typeOptions: Option[];
  sceneOptions: Option[];
}) => {
  const [form] = useForm();
  const { taskModalOpen, editingTaskId, editingTask, isLoading, close } =
    useTaskModal();

  const useMutateTask = editingTaskId ? useEditTask : useAddTask;
  const {
    mutateAsync,
    isLoading: mutateLoading,
    error,
  } = useMutateTask(useTaskListQueryKey());

  useEffect(() => {
    if (editingTask) {
      const { icon, ...rest } = editingTask;
      form.setFieldsValue({ icon: icon ? [{ url: icon }] : [], ...rest });
    }
  }, [editingTask, form]);

  const submit = () => {
    form.validateFields().then(async () => {
      const { icon, ...rest } = form.getFieldsValue();
      await mutateAsync({
        ...editingTask,
        ...rest,
        icon: icon && icon.length ? icon[0].url : "",
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
      title={editingTaskId ? "编辑任务" : "新增任务"}
      size={"large"}
      onClose={closeModal}
      open={taskModalOpen}
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
                name="icon"
                label="图标"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                rules={[{ required: true, message: "请上传图标" }]}
              >
                <OssUpload maxCount={1} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="名称"
                rules={[{ required: true, message: "请输入名称" }]}
              >
                <Input placeholder="请输入名称" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="desc"
                label="描述"
                rules={[{ required: true, message: "请输入描述" }]}
              >
                <Input placeholder="请输入描述" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="btnContent"
                label="按钮文案"
                rules={[{ required: true, message: "请输入按钮文案" }]}
              >
                <Input placeholder="请输入按钮文案" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="luckScore"
                label="福气值"
                rules={[{ required: true, message: "请输入福气值" }]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  placeholder="请输入福气值"
                />
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
              <Form.Item name="timeLimit" label="次数限制">
                <InputNumber
                  style={{ width: "100%" }}
                  placeholder="请输入次数限制"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="scene"
                label="场景"
                rules={[{ required: true, message: "请选择场景" }]}
              >
                <Select placeholder="请选择场景">
                  {sceneOptions.map((item) => (
                    <Select.Option key={item.value} value={item.value}>
                      {item.text}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="param" label="参数">
                <Input placeholder="请输入参数" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      )}
    </Drawer>
  );
};
