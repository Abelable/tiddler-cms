import styled from "@emotion/styled";
import {
  Avatar,
  Dropdown,
  Menu,
  MenuProps,
  Modal,
  Table,
  TablePaginationConfig,
  TableProps,
} from "antd";
import { ButtonNoPadding, ErrorBox, Row, PageTitle } from "components/lib";
import dayjs from "dayjs";
import { useDeleteUser } from "service/user";
import { User } from "types/user";
import { useUserModal, useUsersQueryKey } from "../util";
import { UserOutlined } from "@ant-design/icons";
import { SearchPanelProps } from "./search-panel";

interface ListProps extends TableProps<User>, SearchPanelProps {
  error: Error | unknown;
}

export const List = ({ error, params, setParams, ...restProps }: ListProps) => {
  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      limit: pagination.pageSize,
    });

  return (
    <Container>
      <Header between={true}>
        <PageTitle>管理员列表</PageTitle>
      </Header>
      <ErrorBox error={error} />
      <Table
        rowKey={"id"}
        columns={[
          {
            title: "id",
            dataIndex: "id",
            width: "8rem",
          },
          {
            title: "头像",
            dataIndex: "avatar",
            render: (value) => <Avatar src={value} icon={<UserOutlined />} />,
          },
          {
            title: "昵称",
            dataIndex: "nickname",
          },
          {
            title: "手机号",
            dataIndex: "mobile",
          },
          {
            title: "性别",
            dataIndex: "gender",
            render: (value) => (
              <>{value === 1 ? "男" : value === 2 ? "女" : "未知"}</>
            ),
            filters: [
              { text: "未知", value: 0 },
              { text: "男", value: 1 },
              { text: "女", value: 2 },
            ],
            onFilter: (value, user) => user.gender === value,
          },
          {
            title: "注册时间",
            render: (value, user) => (
              <span>
                {user.createdAt
                  ? dayjs(user.createdAt).format("YYYY-MM-DD HH:mm:ss")
                  : "无"}
              </span>
            ),
            width: "20rem",
            sorter: (a, b) =>
              dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf(),
          },
          {
            title: "操作",
            render(value, user) {
              return <More id={user.id} />;
            },
            width: "8rem",
          },
        ]}
        onChange={setPagination}
        {...restProps}
      />
    </Container>
  );
};

const More = ({ id }: { id: number }) => {
  const { open } = useUserModal();
  const { mutate: deleteUser } = useDeleteUser(useUsersQueryKey());

  const confirmDelete = (id: number) => {
    Modal.confirm({
      title: "确定删除该用户吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => deleteUser(id),
    });
  };

  const items: MenuProps["items"] = [
    {
      label: <div onClick={() => open(id)}>详情</div>,
      key: "detail",
    },
    {
      label: <div onClick={() => confirmDelete(id)}>删除</div>,
      key: "delete",
    },
  ];

  return (
    <Dropdown overlay={<Menu items={items} />}>
      <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
    </Dropdown>
  );
};

const Container = styled.div`
  margin-top: 2.4rem;
  padding: 2.4rem;
  background: #fff;
`;

const Header = styled(Row)`
  margin-bottom: 2.4rem;
`;
