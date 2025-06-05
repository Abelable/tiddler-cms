import { useEffect } from "react";
import { useForm } from "antd/lib/form/Form";
import { UserOutlined } from "@ant-design/icons";
import { useAddShortVideo, useEditShortVideo } from "service/shortVideo";
import { useShortVideoModal, useShortVideoListQueryKey } from "../util";

import { Button, Col, Drawer, Form, Input, Row, Select, Space } from "antd";
import { OssUpload } from "components/oss-upload";
import { ErrorBox, ModalLoading, OptionAvatar } from "components/lib";
import { Map } from "components/map";

import type { ProductOption } from "types/common";
import type { UserOption } from "types/user";

const normFile = (e: any) => {
  if (Array.isArray(e)) return e;
  return e && e.fileList;
};

export const ShortVideoModal = ({
  userOptions,
  scenicOptions,
  hotelOptions,
  restaurantOptions,
  goodsOptions,
}: {
  userOptions: UserOption[];
  scenicOptions: ProductOption[];
  hotelOptions: ProductOption[];
  restaurantOptions: ProductOption[];
  goodsOptions: ProductOption[];
}) => {
  const [form] = useForm();

  const {
    shortVideoModalOpen,
    editingShortVideoId,
    editingShortVideo,
    isLoading,
    close,
  } = useShortVideoModal();

  const useMutationShortVideo = editingShortVideoId
    ? useEditShortVideo
    : useAddShortVideo;
  const {
    mutateAsync,
    error,
    isLoading: mutateLoading,
  } = useMutationShortVideo(useShortVideoListQueryKey());

  useEffect(() => {
    if (editingShortVideo) {
      const { cover, videoUrl, ...rest } = editingShortVideo;
      form.setFieldsValue({
        cover: [
          { url: cover || `${videoUrl}?x-oss-process=video/snapshot,t_0` },
        ],
        video: videoUrl
          ? [
              {
                url: videoUrl,
                thumbUrl:
                  cover || `${videoUrl}?x-oss-process=video/snapshot,t_0`,
              },
            ]
          : [],
        ...rest,
      });
    }
  }, [editingShortVideo, form]);

  const setLng = (longitude: number | undefined) =>
    form.setFieldsValue({
      longitude,
    });
  const setLat = (latitude: number | undefined) =>
    form.setFieldsValue({
      latitude,
    });

  const submit = () => {
    form.validateFields().then(async () => {
      const { cover, video, ...rest } = form.getFieldsValue();
      await mutateAsync({
        ...editingShortVideo,
        ...rest,
        cover: cover[0].url,
        videoUrl: video && video.length ? video[0].url : "",
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
      title={editingShortVideoId ? "编辑视频游记" : "新增视频游记"}
      size={"large"}
      forceRender={true}
      onClose={closeModal}
      open={shortVideoModalOpen}
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
                label="封面"
                valuePropName="fileList"
                getValueFromEvent={normFile}
              >
                <OssUpload maxCount={1} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="video"
                label="视频"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                rules={[{ required: true, message: "请上传视频" }]}
              >
                <OssUpload accept=".mp4" maxCount={1} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="title"
                label="标题"
                rules={[{ required: true, message: "请输入标题" }]}
              >
                <Input placeholder="请输入标题" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="userId"
                label="作者"
                rules={[{ required: true, message: "请选择作者" }]}
              >
                <Select
                  placeholder="请选择作者"
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
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="游记所在经纬度" required>
                <Input.Group>
                  <Row gutter={8}>
                    <Col span={12}>
                      <Form.Item
                        style={{ marginBottom: 0 }}
                        name="longitude"
                        rules={[{ required: true, message: "请输入经度" }]}
                      >
                        <Input placeholder="请输入经度" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        style={{ marginBottom: 0 }}
                        name="latitude"
                        rules={[{ required: true, message: "请输入纬度" }]}
                      >
                        <Input placeholder="请输入纬度" />
                      </Form.Item>
                    </Col>
                  </Row>
                </Input.Group>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="address"
                label="游记地址详情"
                rules={[{ required: true, message: "请输入游记地址详情" }]}
              >
                <Input placeholder="请输入游记地址详情" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Map setLng={setLng} setLat={setLat} />
            </Col>
          </Row>
        </Form>
      )}
    </Drawer>
  );
};
