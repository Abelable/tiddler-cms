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
  Tag,
} from "antd";
import { ButtonNoPadding, ErrorBox, Row, PageTitle } from "components/lib";
import dayjs from "dayjs";
import { useDeleteShopCategory } from "service/shopCategory";
import { useShopCategoryModal, useShopCategoriesQueryKey } from "../util";
import { PlusOutlined } from "@ant-design/icons";

import type { Category, CategoriesSearchParams } from "types/category";
import type { MerchantTypeOption } from "types/shopCategory";

interface ListProps extends TableProps<Category> {
  merchantTypeOptions: MerchantTypeOption[];
  params: Partial<CategoriesSearchParams>;
  setParams: (params: Partial<CategoriesSearchParams>) => void;
  error: Error | unknown;
}

export const List = ({
  merchantTypeOptions,
  error,
  params,
  setParams,
  ...restProps
}: ListProps) => {
  const { open } = useShopCategoryModal();

  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      limit: pagination.pageSize,
    });

  return (
    <Container>
      <Header between={true}>
        <PageTitle>店铺分类</PageTitle>
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
            title: "店铺分类名称",
            dataIndex: "name",
          },
          {
            title: "店铺保证金",
            dataIndex: "deposit",
          },
          {
            title: "适配商家类型",
            dataIndex: "adaptedMerchantTypes",
            render: (value) =>
              value.map((item: number) => (
                <Tag>
                  {
                    merchantTypeOptions.find((type) => type.value === item)
                      ?.label
                  }
                </Tag>
              )),
          },
          {
            title: "创建时间",
            render: (value, role) => (
              <span>
                {role.createdAt
                  ? dayjs(role.createdAt).format("YYYY-MM-DD HH:mm:ss")
                  : "无"}
              </span>
            ),
            width: "20rem",
            sorter: (a, b) =>
              dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf(),
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
  const { startEdit } = useShopCategoryModal();
  const { mutate: deleteRole } = useDeleteShopCategory(
    useShopCategoriesQueryKey()
  );

  const confirmDelete = (id: number) => {
    Modal.confirm({
      title: "确定删除该店铺分类吗？",
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
