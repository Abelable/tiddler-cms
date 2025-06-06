import styled from "@emotion/styled";
import {
  Button,
  Dropdown,
  InputNumber,
  Menu,
  MenuProps,
  Modal,
  Switch,
  Table,
  TablePaginationConfig,
  TableProps,
} from "antd";
import { ButtonNoPadding, ErrorBox, Row, PageTitle } from "components/lib";
import {
  useDeleteGiftType,
  useEditSort,
  useEditStatus,
} from "service/giftType";
import { useGiftTypeModal, useGiftTypeListQueryKey } from "../util";
import { PlusOutlined } from "@ant-design/icons";

import type { GiftTypeListSearchParams, GiftType } from "types/giftType";

interface ListProps extends TableProps<GiftType> {
  error: Error | unknown;
  params: Partial<GiftTypeListSearchParams>;
  setParams: (params: Partial<GiftTypeListSearchParams>) => void;
}

export const List = ({ error, params, setParams, ...restProps }: ListProps) => {
  const { open } = useGiftTypeModal();

  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      limit: pagination.pageSize,
    });

  const { mutate: editSort } = useEditSort(useGiftTypeListQueryKey());
  const { mutate: editStatus } = useEditStatus(useGiftTypeListQueryKey());

  return (
    <Container>
      <Header between={true}>
        <PageTitle>好物类型</PageTitle>
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
            title: "类型名称",
            dataIndex: "name",
          },
          {
            title: "排序",
            dataIndex: "sort",
            render: (value, giftType) => (
              <InputNumber
                value={value}
                onChange={(sort) => editSort({ id: giftType.id, sort })}
              />
            ),
            sorter: (a, b) => a.sort - b.sort,
          },
          {
            title: "显示",
            dataIndex: "status",
            render: (value, giftType) => (
              <Switch
                checked={value === 1}
                onChange={(truthy) =>
                  editStatus({ id: giftType.id, status: truthy ? 1 : 2 })
                }
              />
            ),
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
  const { startEdit } = useGiftTypeModal();
  const { mutate: deleteCategoty } = useDeleteGiftType(
    useGiftTypeListQueryKey()
  );

  const confirmDelete = (id: number) => {
    Modal.confirm({
      title: "确定删除该好物类型吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => deleteCategoty(id),
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
  border-radius: 0.6rem;
`;

const Header = styled(Row)`
  margin-bottom: 2.4rem;
`;
