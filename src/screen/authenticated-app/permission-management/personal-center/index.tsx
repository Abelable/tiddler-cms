import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useUpdateAdminInfo, useAdminInfo } from "service/auth";

import { Button, Form, Input, Menu } from "antd";
import { useForm } from "antd/es/form/Form";
import { OssUpload } from "components/oss-upload";
import { PwdModal } from "./components/pwd-modal";
import { usePwdModal } from "./util";

const normFile = (e: any) => {
  if (Array.isArray(e)) return e;
  return e && e.fileList;
};

const menuOptions = [
  {
    key: "base",
    label: "基本设置",
  },
  {
    key: "security",
    label: "安全设置",
  },
];

export const PersonalCenter = () => {
  const [form] = useForm();
  const [selectKey, setSelectKey] = useState("base");

  const { data: userInfo } = useAdminInfo();
  const { mutateAsync, isLoading: mutateLoading } = useUpdateAdminInfo();
  const { open } = usePwdModal();

  useEffect(() => {
    if (userInfo) {
      const { avatar, nickname } = userInfo;
      form.setFieldsValue({
        avatar: avatar ? [{ url: avatar }] : [],
        nickname,
      });
    }
  }, [userInfo, form]);

  const submit = () => {
    form.validateFields().then(async () => {
      const { avatar, nickname } = form.getFieldsValue();
      await mutateAsync({
        avatar: avatar && avatar.length ? avatar[0].url : "",
        nickname,
      });
    });
  };

  return (
    <Container>
      <Main>
        <Menu
          style={{ width: "22.4rem", height: "100%" }}
          items={menuOptions}
          selectedKeys={[selectKey]}
          onClick={({ key }: { key: string }) => setSelectKey(key)}
        />
        <Content>
          <Title>
            {menuOptions.find((item) => item.key === selectKey)?.label}
          </Title>
          {selectKey === "base" ? (
            <div>
              <Form
                style={{ marginTop: "3rem", width: "40rem" }}
                form={form}
                layout="vertical"
              >
                <Form.Item
                  name="avatar"
                  label="头像"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                >
                  <OssUpload maxCount={1} />
                </Form.Item>
                <Form.Item name="nickname" label="昵称">
                  <Input placeholder="请输入昵称" />
                </Form.Item>
              </Form>
              <Button
                style={{ marginTop: "3rem" }}
                type={"primary"}
                onClick={submit}
                loading={mutateLoading}
              >
                更新基本信息
              </Button>
            </div>
          ) : (
            <div style={{ marginTop: "2rem" }}>
              <SecurityItem>
                <div>
                  <SecurityTitle>账户密码</SecurityTitle>
                  <SecurityContent>当前密码强度：强</SecurityContent>
                </div>
                <Button type="link" onClick={open}>
                  修改
                </Button>
              </SecurityItem>
            </div>
          )}
        </Content>
      </Main>
      <PwdModal />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  padding: 2.4rem;
  height: 100%;
`;
const Main = styled.div`
  position: relative;
  display: flex;
  padding: 2.4rem;
  height: 100%;
  background: #fff;
  border-radius: 0.6rem;
`;
const Content = styled.div`
  padding: 0.8rem 4rem;
  flex: 1;
`;
const Title = styled.div`
  color: rgba(0, 0, 0, 0.88);
  font-size: 2rem;
  font-weight: 500;
`;

const SecurityItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.4rem 0;
  border-bottom: 1px solid rgba(5, 5, 5, 0.06);
`;
const SecurityTitle = styled.div`
  color: rgba(0, 0, 0, 0.88);
  font-size: 1.4rem;
  font-weight: 500;
`;
const SecurityContent = styled.div`
  margin-top: 1rem;
  color: rgba(0, 0, 0, 0.45);
  font-size: 1.4rem;
`;
