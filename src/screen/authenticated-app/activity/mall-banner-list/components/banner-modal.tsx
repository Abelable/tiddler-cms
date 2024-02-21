import { Button, Col, Drawer, Form, Input, Row, Space, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox, ModalLoading } from "components/lib";
import { useAddMallBanner } from "service/mallBanner";
import { useMallBannerModal, useMallBannerListQueryKey } from "../util";
import { useEditMallBanner } from "service/mallBanner";
import { useEffect } from "react";
import { OssUpload } from "components/oss-upload";
import { Option } from "types/common";

const normFile = (e: any) => {
  if (Array.isArray(e)) return e;
  return e && e.fileList;
};

export const MallBannerModal = ({
  sceneOptions,
}: {
  sceneOptions: Option[];
}) => {
  const [form] = useForm();
  const {
    mallBannerModalOpen,
    editingMallBannerId,
    editingMallBanner,
    isLoading,
    close,
  } = useMallBannerModal();

  const useMutateMallBanner = editingMallBannerId
    ? useEditMallBanner
    : useAddMallBanner;
  const {
    mutateAsync,
    isLoading: mutateLoading,
    error,
  } = useMutateMallBanner(useMallBannerListQueryKey());

  useEffect(() => {
    if (editingMallBanner) {
      const { cover, ...rest } = editingMallBanner;
      form.setFieldsValue({ cover: cover ? [{ url: cover }] : [], ...rest });
    }
  }, [editingMallBanner, form]);

  const submit = () => {
    form.validateFields().then(async () => {
      const { cover, ...rest } = form.getFieldsValue();
      await mutateAsync({
        ...editingMallBanner,
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
      title={editingMallBannerId ? "编辑banner" : "新增banner"}
      size={"large"}
      onClose={closeModal}
      open={mallBannerModalOpen}
      bodyStyle={{ paddingBottom: 80 }}
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
                label="活动封面"
                tooltip="图片大小不能超过10MB"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                rules={[{ required: true, message: "请上传活动封面" }]}
              >
                <OssUpload maxCount={1} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="scene"
                label="活动跳转场景"
                rules={[{ required: true, message: "请选择活动跳转场景" }]}
              >
                <Select placeholder="请选择活动跳转场景">
                  {sceneOptions.map((item) => (
                    <Select.Option key={item.value} value={item.value}>
                      {item.text}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="param"
                label="活动链接/id"
                rules={[{ required: true, message: "请输入活动链接/id" }]}
              >
                <Input placeholder="请输入活动链接/id" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="desc" label="活动描述">
                <Input placeholder="请输入活动描述" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      )}
    </Drawer>
  );
};
