import { useEffect } from "react";
import { useForm } from "antd/lib/form/Form";
import { useAddScenic, useEditScenic } from "service/scenic";
import { useScenicModal, useScenicListQueryKey } from "../util";

import { Button, Col, Drawer, Form, Input, Row, Select, Space } from "antd";
import { OssUpload } from "components/oss-upload";
import { ErrorBox } from "components/lib";
import { Map } from "components/map";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

import type { CategoryOption } from "types/category";

const normFile = (e: any) => {
  if (Array.isArray(e)) return e;
  return e && e.fileList;
};

export const ScenicModal = ({
  categoryOptions,
}: {
  categoryOptions: CategoryOption[];
}) => {
  const [form] = useForm();

  const { scenicModalOpen, editingScenicId, editingScenic, close } =
    useScenicModal();

  const useMutationScenic = editingScenicId ? useEditScenic : useAddScenic;
  const { mutateAsync, error, isLoading } = useMutationScenic(
    useScenicListQueryKey()
  );

  useEffect(() => {
    if (editingScenic) {
      const { video, imageList, ...rest } = editingScenic;
      form.setFieldsValue({
        video: video
          ? [{ url: video, cover: `${video}?x-oss-process=video/snapshot,t_0` }]
          : [],
        imageList: imageList?.map((item) => ({ url: item })),
        ...rest,
      });
    }
  }, [editingScenic, form]);

  const setLng = (longitude: number | undefined) =>
    form.setFieldsValue({
      longitude,
    });
  const setLat = (latitude: number | undefined) =>
    form.setFieldsValue({
      latitude,
    });

  const submit = () => {
    console.log("form", form.getFieldsValue());
    // form.validateFields().then(async () => {
    //   const { video, imageList, ...rest } = form.getFieldsValue();
    //   await mutateAsync({
    //     ...editingScenic,
    //     ...rest,
    //     video: video && video.length ? video[0].url : "",
    //     imageList: imageList.map((item: { url: string }) => item.url),
    //   });
    //   closeModal();
    // });
  };

  const closeModal = () => {
    form.resetFields();
    close();
  };

  return (
    <Drawer
      title={editingScenicId ? "编辑景点" : "新增景点"}
      size={"large"}
      forceRender={true}
      onClose={closeModal}
      open={scenicModalOpen}
      bodyStyle={{ paddingBottom: 80 }}
      extra={
        <Space>
          <Button onClick={closeModal}>取消</Button>
          <Button onClick={submit} loading={isLoading} type="primary">
            提交
          </Button>
        </Space>
      }
    >
      <Form form={form} layout="vertical">
        <ErrorBox error={error} />
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="景点名称"
              rules={[{ required: true, message: "请输入景点名称" }]}
            >
              <Input placeholder="请输入景点名称" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="level" label="景点等级">
              <Input placeholder="请输入景点等级，例：5A" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="categoryId"
              label="景点类型"
              rules={[{ required: true, message: "请选择景点类型" }]}
            >
              <Select placeholder="请选择景点类型">
                {categoryOptions.map(({ id, name }) => (
                  <Select.Option key={id} value={id}>
                    {name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="video"
              label="上传景点视频"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <OssUpload accept=".mp4" maxCount={1} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="imageList"
              label="上传景点照片"
              tooltip="图片大小不能超过10MB"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={[{ required: true, message: "请上传景点照片" }]}
            >
              <OssUpload />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="brief"
              label="景点简介"
              rules={[{ required: true, message: "请输入景点简介" }]}
            >
              <Input.TextArea rows={6} placeholder="请输入景点简介" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="景点所在经纬度" required>
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
              label="景点地址详情"
              rules={[{ required: true, message: "请输入景点地址详情" }]}
            >
              <Input placeholder="请输入景点地址详情" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Map setLng={setLng} setLat={setLat} />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="咨询热线">
              <Form.List name="hotlineList">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space
                        key={key}
                        style={{ display: "flex" }}
                        align="baseline"
                      >
                        <Form.Item
                          {...restField}
                          rules={[
                            { required: true, message: "请输入咨询热线" },
                          ]}
                        >
                          <Input placeholder="请输入咨询热线" />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        添加咨询热线
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="景区设施">
              <Form.List name="facilityList">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space
                        key={key}
                        style={{ display: "flex" }}
                        align="baseline"
                      >
                        <Form.Item
                          {...restField}
                          name={[name, "facilityId"]}
                          rules={[{ required: true, message: "请选择设施" }]}
                        >
                          <Select
                            style={{ width: "10rem" }}
                            placeholder="选择设施"
                          >
                            {[
                              { id: 1, name: "停车场" },
                              { id: 2, name: "卫生间" },
                              { id: 3, name: "商店" },
                              { id: 4, name: "餐厅" },
                            ].map((facilityOption) => (
                              <Select.Option
                                key={facilityOption.id}
                                value={facilityOption.id}
                              >
                                {facilityOption.name}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, "content"]}
                          rules={[
                            { required: true, message: "请输入设施描述" },
                          ]}
                        >
                          <Input
                            style={{ width: "20rem" }}
                            placeholder="请输入设施描述"
                          />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        添加景区设施
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};
