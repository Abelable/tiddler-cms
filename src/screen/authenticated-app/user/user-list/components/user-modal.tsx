import { Avatar, Descriptions, Drawer } from "antd";
import { ErrorBox, ModalLoading } from "components/lib";
import dayjs from "dayjs";
import { useUserModal } from "../util";
import { UserOutlined } from "@ant-design/icons";

export const UserModal = () => {
  const { close, userModalOpen, editingUser, error, isLoading } =
    useUserModal();

  return (
    <Drawer
      forceRender={true}
      title="用户详情"
      size={"large"}
      onClose={close}
      open={userModalOpen}
      bodyStyle={{ paddingBottom: 80 }}
    >
      <ErrorBox error={error} />
      {isLoading ? (
        <ModalLoading />
      ) : (
        <>
          <Descriptions title="基础信息" size={"small"} column={3}>
            <Descriptions.Item label="ID">{editingUser?.id}</Descriptions.Item>
            <Descriptions.Item label="头像">
              <Avatar
                src={editingUser?.avatar}
                icon={<UserOutlined />}
                size="small"
              />
            </Descriptions.Item>
            <Descriptions.Item label="昵称">
              {editingUser?.nickname}
            </Descriptions.Item>
            <Descriptions.Item label="手机号">
              {editingUser?.mobile}
            </Descriptions.Item>
            <Descriptions.Item label="性别">
              {editingUser?.gender === 1
                ? "男"
                : editingUser?.gender === 2
                ? "女"
                : "未知"}
            </Descriptions.Item>
            <Descriptions.Item label="注册时间">
              {dayjs(editingUser?.createdAt).format("YYYY-MM-DD HH:mm:ss")}
            </Descriptions.Item>
          </Descriptions>
        </>
      )}
    </Drawer>
  );
};
