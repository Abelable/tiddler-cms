import styled from "@emotion/styled";
import {
  Button,
  Dropdown,
  Menu,
  MenuProps,
  Modal,
  Table,
  TablePaginationConfig,
  TableProps,
} from "antd";
import { ButtonNoPadding, ErrorBox, Row } from "components/lib";
import dayjs from "dayjs";
import { useDeleteRole } from "service/role";
import { RoleItem, RolesSearchParams } from "types/role";
import { useRoleModal, useRolesQueryKey } from "../util";

interface ListProps extends TableProps<RoleItem> {
  params: Partial<RolesSearchParams>;
  setParams: (params: Partial<RolesSearchParams>) => void;
  error: Error | unknown;
}

export const List = ({ error, params, setParams, ...restProps }: ListProps) => {
  const { open } = useRoleModal();

  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      limit: pagination.pageSize,
    });

  return (
    <Container>
      <Header between={true}>
        <div>角色列表</div>
        <Button onClick={() => open()}>新建角色</Button>
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
            title: "角色名称",
            dataIndex: "name",
          },
          {
            title: "角色描述",
            dataIndex: "desc",
          },
          {
            title: "添加时间",
            render: (value, user) => (
              <span>
                {user.created_at
                  ? dayjs(Number(user.created_at) * 1000).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )
                  : "无"}
              </span>
            ),
            width: "18rem",
            sorter: (a, b) => Number(a.created_at) - Number(b.created_at),
          },
          {
            title: "操作",
            render(value, role) {
              return <More id={role.id} />;
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
  const { startEdit } = useRoleModal();
  const { mutate: deleteRole } = useDeleteRole(useRolesQueryKey());

  const confirmDelete = (id: number) => {
    Modal.confirm({
      title: "确定删除该配置吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => deleteRole(id),
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
    <Dropdown overlay={<Menu items={items} />}>
      <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
    </Dropdown>
  );
};

const Container = styled.div`
  padding: 2.4rem;
  background: #fff;
`;

const Header = styled(Row)`
  margin-bottom: 2.4rem;
`;
