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
import dayjs from "dayjs";
import { useDeleteGoodsCategory } from "service/goodsCategory";
import { useGoodsCategoryModal, useGoodsCategoriesQueryKey } from "../util";
import { PlusOutlined } from "@ant-design/icons";

import type { GoodsCategory } from "types/goodsCategory";
import type { SearchPanelProps } from "./search-panel";

interface ListProps extends TableProps<GoodsCategory>, SearchPanelProps {
  error: Error | unknown;
}

export const List = ({
  shopCategoryOptions,
  error,
  params,
  setParams,
  ...restProps
}: ListProps) => {
  const { open } = useGoodsCategoryModal();

  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      limit: pagination.pageSize,
    });

  return (
    <Container>
      <Header between={true}>
        <PageTitle>商品分类</PageTitle>
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
            title: "商品分类名称",
            dataIndex: "name",
          },
          {
            title: "所属店铺分类",
            dataIndex: "shopCategoryId",
            render: (value) =>
              shopCategoryOptions.find((item) => item.id === value)?.name,
          },
          {
            title: "销售佣金比例范围",
            render: (value, category) => (
              <>{`${category.minSalesCommissionRate}% ~ ${category.maxSalesCommissionRate}%`}</>
            ),
          },
          {
            title: "代言奖励比例范围",
            render: (value, category) => (
              <>{`${category.minPromotionCommissionRate}% ~ ${category.maxPromotionCommissionRate}%`}</>
            ),
          },
          {
            title: "代言奖励上限",
            dataIndex: "promotionCommissionUpperLimit",
            render: (value) => <>¥{value}</>,
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
  const { startEdit } = useGoodsCategoryModal();
  const { mutate: deleteRole } = useDeleteGoodsCategory(
    useGoodsCategoriesQueryKey()
  );

  const confirmDelete = (id: number) => {
    Modal.confirm({
      title: "确定删除该商品分类吗？",
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
