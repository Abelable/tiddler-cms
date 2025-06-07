import styled from "@emotion/styled";
import {
  Avatar,
  Button,
  Dropdown,
  MenuProps,
  Modal,
  Table,
  TablePaginationConfig,
  TableProps,
} from "antd";
import { ButtonNoPadding, ErrorBox, Row, PageTitle } from "components/lib";
import dayjs from "dayjs";
import { useDeleteAdmin } from "service/admin";
import { Admin } from "types/admin";
import { useAdminModal, useAdminsQueryKey } from "../util";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import { SearchPanelProps } from "./search-panel";

interface ListProps extends TableProps<Admin>, SearchPanelProps {
  error: Error | unknown;
}

export const List = ({
  roleOptions,
  error,
  params,
  setParams,
  ...restProps
}: ListProps) => {
  const { open } = useAdminModal();

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
        <Button onClick={() => open()} type={"primary"} icon={<PlusOutlined />}>
          新增
        </Button>
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
            title: "账号",
            dataIndex: "account",
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
            title: "角色",
            dataIndex: "roleId",
            render: (value) => (
              <>{roleOptions.find((item) => item.id === value)?.name}</>
            ),
          },
          {
            title: "更新时间",
            render: (value, admin) => (
              <span>
                {admin.updatedAt
                  ? dayjs(admin.updatedAt).format("YYYY-MM-DD HH:mm:ss")
                  : "无"}
              </span>
            ),
            width: "20rem",
            sorter: (a, b) =>
              dayjs(a.updatedAt).valueOf() - dayjs(b.updatedAt).valueOf(),
          },
          {
            title: "创建时间",
            render: (value, admin) => (
              <span>
                {admin.createdAt
                  ? dayjs(admin.createdAt).format("YYYY-MM-DD HH:mm:ss")
                  : "无"}
              </span>
            ),
            width: "20rem",
            sorter: (a, b) =>
              dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf(),
          },
          {
            title: "操作",
            render(value, admin) {
              return <More id={admin.id} />;
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
  const { startEdit } = useAdminModal();
  const { mutate: deleteAdmin } = useDeleteAdmin(useAdminsQueryKey());

  const confirmDelete = (id: number) => {
    Modal.confirm({
      title: "确定删除该管理员吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => deleteAdmin(id),
    });
  };

  const items: MenuProps["items"] = [
    {
      label: <div onClick={() => startEdit(id)}>编辑</div>,
      key: "edit",
    },
    {
      label: <div onClick={() => confirmDelete(id)}>删除</div>,
      key: "delete",
    },
  ];

  return (
    <Dropdown menu={{ items }}>
      <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
    </Dropdown>
  );
};

const Container = styled.div`
  margin-top: 2.4rem;
  padding: 2.4rem;
  background: #fff;
  border-radius: 0.6rem;
`;

const Header = styled(Row)`
  margin-bottom: 2.4rem;
`;
