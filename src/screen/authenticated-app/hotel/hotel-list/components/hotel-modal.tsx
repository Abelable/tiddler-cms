import { useEffect } from "react";
import { useForm } from "antd/lib/form/Form";
import { useAddHotel, useEditHotel } from "service/hotel";
import { useHotelModal, useHotelListQueryKey } from "../util";

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
  DatePicker,
  InputNumber,
  Divider,
} from "antd";
import { OssUpload } from "components/oss-upload";
import { ErrorBox, Row as CustomRow, ModalLoading } from "components/lib";
import { Map } from "components/map";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

import type { CategoryOption } from "types/category";
import type { Option } from "types/common";

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

const normFile = (e: any) => {
  if (Array.isArray(e)) return e;
  return e && e.fileList;
};

export const HotelModal = ({
  gradeOptions,
  categoryOptions,
}: {
  gradeOptions: Option[];
  categoryOptions: CategoryOption[];
}) => {
  const [form] = useForm();

  const { hotelModalOpen, editingHotelId, editingHotel, isLoading, close } =
    useHotelModal();

  const useMutationHotel = editingHotelId ? useEditHotel : useAddHotel;
  const {
    mutateAsync,
    error,
    isLoading: mutateLoading,
  } = useMutationHotel(useHotelListQueryKey());

  useEffect(() => {
    if (editingHotel) {
      const { video, imageList, ...rest } = editingHotel;
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
        ...rest,
      });
    }
  }, [editingHotel, form]);

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
      const { video, imageList, projectList, ...rest } = form.getFieldsValue();
      await mutateAsync({
        ...editingHotel,
        ...rest,
        video: video && video.length ? video[0].url : "",
        imageList: imageList.map((item: { url: string }) => item.url),
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
      title={editingHotelId ? "编辑酒店" : "新增酒店"}
      size={"large"}
      forceRender={true}
      onClose={closeModal}
      open={hotelModalOpen}
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
                name="name"
                label="酒店名称"
                rules={[{ required: true, message: "请输入酒店名称" }]}
              >
                <Input placeholder="请输入酒店名称" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="grade"
                label="酒店档次"
                rules={[{ required: true, message: "请选择酒店档次" }]}
              >
                <Select placeholder="请选择酒店档次">
                  {gradeOptions.map(({ text, value }) => (
                    <Select.Option key={value} value={value}>
                      {text}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="categoryId"
                label="酒店类型"
                rules={[{ required: true, message: "请选择酒店类型" }]}
              >
                <Select placeholder="请选择酒店类型">
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
                label="上传酒店视频"
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
                label="上传酒店照片"
                tooltip="图片大小不能超过10MB"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                rules={[{ required: true, message: "请上传酒店照片" }]}
              >
                <OssUpload />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="酒店所在经纬度" required>
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
                label="酒店地址详情"
                rules={[{ required: true, message: "请输入酒店地址详情" }]}
              >
                <Input placeholder="请输入酒店地址详情" />
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
              <Form.Item
                name="openingYear"
                label="开业年份"
                rules={[{ required: true, message: "请选择开业年份" }]}
              >
                <DatePicker
                  style={{ width: "33.6rem" }}
                  picker="year"
                  placeholder="请选择开业年份"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="lastDecorationYear" label="装修年份">
                <DatePicker
                  style={{ width: "33.6rem" }}
                  picker="year"
                  placeholder="请选择装修年份"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="roomNum"
                label="房间数量"
                rules={[{ required: true, message: "请填写房间数量" }]}
              >
                <InputNumber
                  style={{ width: "33.6rem" }}
                  placeholder="请填写房间数量"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="tel"
                label="联系电话"
                rules={[{ required: true, message: "请输入酒店联系电话" }]}
              >
                <Input
                  style={{ width: "33.6rem" }}
                  placeholder="请输入酒店联系电话"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="酒店特色标签">
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
                          <MinusCircleOutlined onClick={() => remove(name)} />
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
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="brief" label="酒店简介">
                <Input.TextArea rows={6} placeholder="请输入酒店简介" />
              </Form.Item>
            </Col>
          </Row>
          <Divider orientation="left" plain>
            酒店设施
          </Divider>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="娱乐设施">
                <Form.List name="recreationFacility">
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
                              { required: true, message: "请输入设施名称" },
                            ]}
                          >
                            <Input
                              style={{ width: "31rem" }}
                              placeholder="请输入设施名称"
                            />
                          </Form.Item>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>
                      ))}
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        添加娱乐设施
                      </Button>
                    </>
                  )}
                </Form.List>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="康体设施">
                <Form.List name="healthFacility">
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
                              { required: true, message: "请输入设施名称" },
                            ]}
                          >
                            <Input
                              style={{ width: "31rem" }}
                              placeholder="请输入设施名称"
                            />
                          </Form.Item>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>
                      ))}
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        添加康体设施
                      </Button>
                    </>
                  )}
                </Form.List>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="儿童设施">
                <Form.List name="childrenFacility">
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
                              { required: true, message: "请输入设施名称" },
                            ]}
                          >
                            <Input
                              style={{ width: "31rem" }}
                              placeholder="请输入设施名称"
                            />
                          </Form.Item>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>
                      ))}
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        添加儿童设施
                      </Button>
                    </>
                  )}
                </Form.List>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="通用设施">
                <Form.List name="commonFacility">
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
                              { required: true, message: "请输入设施名称" },
                            ]}
                          >
                            <Input
                              style={{ width: "31rem" }}
                              placeholder="请输入设施名称"
                            />
                          </Form.Item>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>
                      ))}
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        添加通用设施
                      </Button>
                    </>
                  )}
                </Form.List>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="公共区设施">
                <Form.List name="publicAreaFacility">
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
                              { required: true, message: "请输入设施名称" },
                            ]}
                          >
                            <Input
                              style={{ width: "31rem" }}
                              placeholder="请输入设施名称"
                            />
                          </Form.Item>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>
                      ))}
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        添加公共区设施
                      </Button>
                    </>
                  )}
                </Form.List>
              </Form.Item>
            </Col>
          </Row>
          <Divider orientation="left" plain>
            酒店服务
          </Divider>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="交通服务">
                <Form.List name="trafficService">
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
                              { required: true, message: "请输入服务名称" },
                            ]}
                          >
                            <Input
                              style={{ width: "31rem" }}
                              placeholder="请输入服务名称"
                            />
                          </Form.Item>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>
                      ))}
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        添加交通服务
                      </Button>
                    </>
                  )}
                </Form.List>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="餐饮服务">
                <Form.List name="cateringService">
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
                              { required: true, message: "请输入服务名称" },
                            ]}
                          >
                            <Input
                              style={{ width: "31rem" }}
                              placeholder="请输入服务名称"
                            />
                          </Form.Item>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>
                      ))}
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        添加餐饮服务
                      </Button>
                    </>
                  )}
                </Form.List>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="前台服务">
                <Form.List name="receptionService">
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
                              { required: true, message: "请输入服务名称" },
                            ]}
                          >
                            <Input
                              style={{ width: "31rem" }}
                              placeholder="请输入服务名称"
                            />
                          </Form.Item>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>
                      ))}
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        添加前台服务
                      </Button>
                    </>
                  )}
                </Form.List>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="清洁服务">
                <Form.List name="cleanService">
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
                              { required: true, message: "请输入服务名称" },
                            ]}
                          >
                            <Input
                              style={{ width: "31rem" }}
                              placeholder="请输入服务名称"
                            />
                          </Form.Item>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>
                      ))}
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        添加清洁服务
                      </Button>
                    </>
                  )}
                </Form.List>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="商务服务">
                <Form.List name="businessService">
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
                              { required: true, message: "请输入服务名称" },
                            ]}
                          >
                            <Input
                              style={{ width: "31rem" }}
                              placeholder="请输入服务名称"
                            />
                          </Form.Item>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>
                      ))}
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        添加商务服务
                      </Button>
                    </>
                  )}
                </Form.List>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="其他服务">
                <Form.List name="otherService">
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
                              { required: true, message: "请输入服务名称" },
                            ]}
                          >
                            <Input
                              style={{ width: "31rem" }}
                              placeholder="请输入服务名称"
                            />
                          </Form.Item>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>
                      ))}
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        添加其他服务
                      </Button>
                    </>
                  )}
                </Form.List>
              </Form.Item>
            </Col>
          </Row>

          <Divider orientation="left" plain>
            酒店政策
          </Divider>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="重要提醒">
                <Form.List name="remindList">
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
                              { required: true, message: "请输入提醒事项" },
                            ]}
                          >
                            <Input
                              style={{ width: "31rem" }}
                              placeholder="请输入提醒事项"
                            />
                          </Form.Item>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>
                      ))}
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        添加提醒事项
                      </Button>
                    </>
                  )}
                </Form.List>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="入住必读">
                <Form.List name="checkInTipList">
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
                              { required: true, message: "请输入必读事项" },
                            ]}
                          >
                            <Input
                              style={{ width: "31rem" }}
                              placeholder="请输入必读事项"
                            />
                          </Form.Item>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>
                      ))}
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        添加必读事项
                      </Button>
                    </>
                  )}
                </Form.List>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="预定须知">
                <Form.List name="preorderTipList">
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
                              { required: true, message: "请输入预定须知" },
                            ]}
                          >
                            <Input
                              style={{ width: "31rem" }}
                              placeholder="请输入预定须知"
                            />
                          </Form.Item>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>
                      ))}
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        添加预定须知
                      </Button>
                    </>
                  )}
                </Form.List>
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
                            <TimePicker format="HH:mm" placeholder="开始时间" />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, "closeTime"]}
                            rules={[
                              { required: true, message: "请选择结束时间" },
                            ]}
                          >
                            <TimePicker format="HH:mm" placeholder="结束时间" />
                          </Form.Item>
                          <Form.Item {...restField} name={[name, "tips"]}>
                            <Input placeholder="补充时间提示" />
                          </Form.Item>
                          <MinusCircleOutlined onClick={() => remove(name)} />
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
                          <MinusCircleOutlined onClick={() => remove(name)} />
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
              <Form.Item label="酒店项目">
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
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>
                      ))}
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        添加酒店项目
                      </Button>
                    </>
                  )}
                </Form.List>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="酒店设施">
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
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>
                      ))}
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        添加酒店设施
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
                          <MinusCircleOutlined onClick={() => remove(name)} />
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
                          <MinusCircleOutlined onClick={() => remove(name)} />
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
        </Form>
      )}
    </Drawer>
  );
};
