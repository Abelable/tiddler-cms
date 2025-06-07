import { useEffect } from "react";
import { useForm } from "antd/lib/form/Form";
import dayjs from "dayjs";
import { useAddScenic, useEditScenic } from "service/scenic";
import { useScenicModal, useScenicListQueryKey } from "../util";

import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
  TimePicker,
  InputNumber,
} from "antd";
import { OssUpload } from "components/oss-upload";
import { ErrorBox, Row as CustomRow, ModalLoading } from "components/lib";
import { Map } from "components/map";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

import type { CategoryOption } from "types/category";
import type { OpenTime } from "types/scenic";

const facilityOptions = [
  { id: 1, name: "停车场" },
  { id: 2, name: "卫生间" },
  { id: 3, name: "商店" },
  { id: 4, name: "餐厅" },
];
const monthOptions = [
  { id: 1, name: "1月" },
  { id: 2, name: "2月" },
  { id: 3, name: "3月" },
  { id: 4, name: "4月" },
  { id: 5, name: "5月" },
  { id: 6, name: "6月" },
  { id: 7, name: "7月" },
  { id: 8, name: "8月" },
  { id: 9, name: "9月" },
  { id: 10, name: "10月" },
  { id: 11, name: "11月" },
  { id: 12, name: "12月" },
];
const format = "HH:mm";

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

  const { scenicModalOpen, editingScenicId, editingScenic, isLoading, close } =
    useScenicModal();

  const useMutationScenic = editingScenicId ? useEditScenic : useAddScenic;
  const {
    mutateAsync,
    error,
    isLoading: mutateLoading,
  } = useMutationScenic(useScenicListQueryKey());

  useEffect(() => {
    if (editingScenic) {
      const { video, imageList, openTimeList, projectList, ...rest } =
        editingScenic;
      form.setFieldsValue({
        video: video
          ? [
              {
                url: video,
                thumbUrl: `${video}?x-oss-process=video/snapshot,t_0`,
              },
            ]
          : [],
        imageList: imageList?.length
          ? imageList?.map((item) => ({ url: item }))
          : imageList,
        openTimeList: openTimeList?.length
          ? openTimeList.map((item) => ({
              ...item,
              openTime: dayjs(item.openTime, format),
              closeTime: dayjs(item.closeTime, format),
            }))
          : openTimeList,
        projectList: projectList?.length
          ? projectList.map((item) => ({
              ...item,
              image: [{ url: item.image }],
            }))
          : projectList,
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
    form.validateFields().then(async () => {
      const {
        video,
        imageList,
        projectList = [],
        openTimeList,
        ...rest
      } = form.getFieldsValue();
      await mutateAsync({
        ...editingScenic,
        ...rest,
        video: video && video.length ? video[0].url : "",
        imageList: imageList.map((item: { url: string }) => item.url),
        openTimeList: openTimeList.map((item: OpenTime) => ({
          ...item,
          openTime: dayjs(item.openTime).format(format),
          closeTime: dayjs(item.closeTime).format(format),
        })),
        projectList: projectList.length
          ? projectList.map(
              (item: { image: { url: string }[]; name: string }) => ({
                ...item,
                image: item.image[0].url,
              })
            )
          : projectList,
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
      title={editingScenicId ? "编辑景区" : "新增景区"}
      size={"large"}
      forceRender={true}
      onClose={closeModal}
      open={scenicModalOpen}
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
                name="name"
                label="景区名称"
                rules={[{ required: true, message: "请输入景区名称" }]}
              >
                <Input placeholder="请输入景区名称" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="level" label="景区等级">
                <Input placeholder="请输入景区等级，例：5A" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="categoryId"
                label="景区类型"
                rules={[{ required: true, message: "请选择景区类型" }]}
              >
                <Select placeholder="请选择景区类型">
                  {categoryOptions.map(({ id, name }) => (
                    <Select.Option key={id} value={id}>
                      {name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="price"
                label="门票起始价格"
                rules={[{ required: true, message: "请填写门票起始价格" }]}
              >
                <InputNumber
                  prefix="￥"
                  style={{ width: "100%" }}
                  placeholder="请填写门票起始价格"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="video"
                label="上传景区视频"
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
                label="上传景区照片"
                tooltip="图片大小不能超过10MB"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                rules={[{ required: true, message: "请上传景区照片" }]}
              >
                <OssUpload multiple />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="景区所在经纬度" required>
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
                label="景区地址详情"
                rules={[{ required: true, message: "请输入景区地址详情" }]}
              >
                <Input placeholder="请输入景区地址详情" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Map setLng={setLng} setLat={setLat} />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="brief"
                label="景区简介"
                rules={[{ required: true, message: "请输入景区简介" }]}
              >
                <Input.TextArea rows={6} placeholder="请输入景区简介" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="开放时间">
                <Form.List name="openTimeList">
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
                            name={[name, "openMonth"]}
                            rules={[
                              { required: true, message: "请选择开始月份" },
                            ]}
                          >
                            <Select
                              style={{ width: "10rem" }}
                              placeholder="开始月份"
                            >
                              {monthOptions.map((monthOption) => (
                                <Select.Option
                                  key={monthOption.id}
                                  value={monthOption.id}
                                >
                                  {monthOption.name}
                                </Select.Option>
                              ))}
                            </Select>
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, "closeMonth"]}
                            rules={[
                              { required: true, message: "请选择结束月份" },
                            ]}
                          >
                            <Select
                              style={{ width: "10rem" }}
                              placeholder="结束月份"
                            >
                              {monthOptions.map((monthOption) => (
                                <Select.Option
                                  key={monthOption.id}
                                  value={monthOption.id}
                                >
                                  {monthOption.name}
                                </Select.Option>
                              ))}
                            </Select>
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, "openTime"]}
                            rules={[
                              { required: true, message: "请选择开始时间" },
                            ]}
                          >
                            <TimePicker
                              format={format}
                              placeholder="开始时间"
                            />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, "closeTime"]}
                            rules={[
                              { required: true, message: "请选择结束时间" },
                            ]}
                          >
                            <TimePicker
                              format={format}
                              placeholder="结束时间"
                            />
                          </Form.Item>
                          <Form.Item {...restField} name={[name, "tips"]}>
                            <Input placeholder="补充时间提示" />
                          </Form.Item>
                          <MinusCircleOutlined
                            style={{ color: "#ff4d4f" }}
                            onClick={() => remove(name)}
                          />
                        </Space>
                      ))}
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        添加开放时间
                      </Button>
                    </>
                  )}
                </Form.List>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="优待政策">
                <Form.List name="policyList">
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
                            name={[name, "crowd"]}
                            rules={[
                              { required: true, message: "请输入适用人群" },
                            ]}
                          >
                            <Input placeholder="请输入适用人群" />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, "condition"]}
                            rules={[
                              { required: true, message: "请输入适用条件" },
                            ]}
                          >
                            <Input
                              style={{ width: "30rem" }}
                              placeholder="请输入适用条件"
                            />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, "content"]}
                            rules={[
                              { required: true, message: "请输入政策内容" },
                            ]}
                          >
                            <Input placeholder="请输入政策内容" />
                          </Form.Item>
                          <MinusCircleOutlined
                            style={{ color: "#ff4d4f" }}
                            onClick={() => remove(name)}
                          />
                        </Space>
                      ))}
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        添加优待政策
                      </Button>
                    </>
                  )}
                </Form.List>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="景区项目">
                <Form.List name="projectList">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <Space key={key}>
                          <CustomRow>
                            <Form.Item
                              {...restField}
                              name={[name, "image"]}
                              valuePropName="fileList"
                              getValueFromEvent={normFile}
                              rules={[
                                { required: true, message: "请上传项目照片" },
                              ]}
                            >
                              <OssUpload maxCount={1} />
                            </Form.Item>
                            <Form.Item
                              {...restField}
                              name={[name, "name"]}
                              rules={[
                                { required: true, message: "请输入项目名称" },
                              ]}
                            >
                              <Input placeholder="请输入项目名称" />
                            </Form.Item>
                          </CustomRow>
                          <MinusCircleOutlined
                            style={{ color: "#ff4d4f" }}
                            onClick={() => remove(name)}
                          />
                        </Space>
                      ))}
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        添加景区项目
                      </Button>
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
                              {facilityOptions.map((facilityOption) => (
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
                          <MinusCircleOutlined
                            style={{ color: "#ff4d4f" }}
                            onClick={() => remove(name)}
                          />
                        </Space>
                      ))}
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        添加景区设施
                      </Button>
                    </>
                  )}
                </Form.List>
              </Form.Item>
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
                            name={name}
                            rules={[
                              { required: true, message: "请输入咨询热线" },
                            ]}
                          >
                            <Input placeholder="请输入咨询热线" />
                          </Form.Item>
                          <MinusCircleOutlined
                            style={{ color: "#ff4d4f" }}
                            onClick={() => remove(name)}
                          />
                        </Space>
                      ))}
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        添加咨询热线
                      </Button>
                    </>
                  )}
                </Form.List>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="游玩贴士">
                <Form.List name="tipsList">
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
                            name={[name, "title"]}
                            rules={[
                              { required: true, message: "请输入贴士标题" },
                            ]}
                          >
                            <Input
                              style={{ width: "10rem" }}
                              placeholder="请输入标题"
                            />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, "content"]}
                            rules={[
                              { required: true, message: "请输入贴士内容" },
                            ]}
                          >
                            <Input
                              style={{ width: "20rem" }}
                              placeholder="请输入内容"
                            />
                          </Form.Item>
                          <MinusCircleOutlined
                            style={{ color: "#ff4d4f" }}
                            onClick={() => remove(name)}
                          />
                        </Space>
                      ))}
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        添加游玩贴士
                      </Button>
                    </>
                  )}
                </Form.List>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="特色标签">
                <Form.List name="featureTagList">
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
                            name={name}
                            rules={[
                              { required: true, message: "请输入标签内容" },
                            ]}
                          >
                            <Input
                              style={{ width: "31rem" }}
                              placeholder="请输入标签内容"
                            />
                          </Form.Item>
                          <MinusCircleOutlined
                            style={{ color: "#ff4d4f" }}
                            onClick={() => remove(name)}
                          />
                        </Space>
                      ))}
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        添加特色标签
                      </Button>
                    </>
                  )}
                </Form.List>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      )}
    </Drawer>
  );
};
