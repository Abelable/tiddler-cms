import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Space,
  InputNumber,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { OssUpload } from "components/oss-upload";

import { useForm } from "antd/lib/form/Form";
import { ErrorBox, ModalLoading } from "components/lib";
import {
  useAddHotelRoomType,
  useEditHotelRoomType,
} from "service/hotelRoomType";
import { useHotelRoomTypeModal, useHotelRoomTypeListQueryKey } from "../util";
import { useEffect } from "react";

const normFile = (e: any) => {
  if (Array.isArray(e)) return e;
  return e && e.fileList;
};

export const HotelRoomTypeModal = ({ hotelId }: { hotelId: number }) => {
  const [form] = useForm();
  const {
    hotelRoomTypeModalOpen,
    editingHotelRoomType,
    editingHotelRoomTypeId,
    isLoading,
    close,
  } = useHotelRoomTypeModal();

  const useMutateRole = editingHotelRoomTypeId
    ? useEditHotelRoomType
    : useAddHotelRoomType;
  const {
    mutateAsync,
    isLoading: mutateLoading,
    error,
  } = useMutateRole(useHotelRoomTypeListQueryKey());

  useEffect(() => {
    if (editingHotelRoomType) {
      const { imageList, ...rest } = editingHotelRoomType;
      form.setFieldsValue({
        imageList: imageList?.length
          ? imageList?.map((item) => ({ url: item }))
          : imageList,
        ...rest,
      });
    }
  }, [editingHotelRoomType, form]);

  const confirm = () => {
    form.validateFields().then(async () => {
      const { imageList, ...rest } = form.getFieldsValue();
      await mutateAsync({
        hotelId,
        ...editingHotelRoomType,
        ...rest,
        imageList: imageList.map((item: { url: string }) => item.url),
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
      title={editingHotelRoomTypeId ? "编辑酒店房型" : "新增酒店房型"}
      open={hotelRoomTypeModalOpen}
      onClose={closeModal}
      extra={
        <Space>
          <Button onClick={closeModal}>取消</Button>
          <Button onClick={confirm} loading={mutateLoading} type="primary">
            提交
          </Button>
        </Space>
      }
      forceRender={true}
      size={"large"}
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
    >
      <ErrorBox error={error} />
      {isLoading ? (
        <ModalLoading />
      ) : (
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="imageList"
                label="上传房间照片"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                tooltip="图片大小不能超过10MB"
                rules={[{ required: true, message: "请上传房间照片" }]}
              >
                <OssUpload multiple />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="房型名称"
                rules={[{ required: true, message: "请输入房型名称" }]}
              >
                <Input placeholder="请输入房型名称" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="bedDesc"
                label="床铺描述"
                rules={[{ required: true, message: "请输入床铺描述" }]}
              >
                <Input placeholder="请输入床铺描述" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="areaSize"
                label="房间面积（m²）"
                rules={[{ required: true, message: "请输入房间面积" }]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  placeholder="请输入房间面积"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="floorDesc"
                label="楼层描述"
                rules={[{ required: true, message: "请输入楼层描述" }]}
              >
                <Input placeholder="请输入楼层描述" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="房间设施">
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
                        添加房间设施
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
