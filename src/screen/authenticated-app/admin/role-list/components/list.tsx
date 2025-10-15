import styled from "@emotion/styled";
import {
  Button,
  Dropdown,
  MenuProps,
  Modal,
  Table,
  TablePaginationConfig,
  TableProps,
} from "antd";
import { ButtonNoPadding, ErrorBox, Row, PageTitle } from "components/lib";
import { useDeleteRole } from "service/role";
import { Role, RolesSearchParams } from "types/role";
import { useRoleModal, useRolesQueryKey } from "../util";
import { PlusOutlined } from "@ant-design/icons";

interface ListProps extends TableProps<Role> {
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
        <PageTitle>角色列表</PageTitle>
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
            title: "角色名称",
            dataIndex: "name",
          },
          {
            title: "角色描述",
            dataIndex: "desc",
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
      title: "确定删除该管理员角色吗？",
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
    <Dropdown menu={{ items }}>
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
