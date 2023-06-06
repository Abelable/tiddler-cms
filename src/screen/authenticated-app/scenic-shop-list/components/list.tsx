import {
  Dropdown,
  Menu,
  MenuProps,
  Table,
  TablePaginationConfig,
  TableProps,
} from "antd";
import { ButtonNoPadding, ErrorBox, Row, PageTitle } from "components/lib";

import styled from "@emotion/styled";
import dayjs from "dayjs";
import { useShopModal } from "../util";
import { SearchPanelProps } from "./search-panel";

import type { Option } from "types/common";
import type { Shop } from "types/scenicShop";

interface ListProps extends TableProps<Shop>, SearchPanelProps {
  error: Error | unknown;
  shopTypeOptions: Option[];
}

const shopStatusOptions = [
  { text: "未支付保证金", value: 0 },
  { text: "已支付保证金", value: 1 },
];

export const List = ({
  shopTypeOptions,
  error,
  params,
  setParams,
  ...restProps
}: ListProps) => {
  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      limit: pagination.pageSize,
    });

  return (
    <Container>
      <Header between={true}>
        <PageTitle>店铺列表</PageTitle>
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
            title: "店铺名称",
            dataIndex: "name",
          },
          {
            title: "店铺状态",
            dataIndex: "status",
            render: (value) =>
              value === 0 ? (
                <span style={{ color: "#f50" }}>未支付保证金</span>
              ) : (
                <span style={{ color: "#87d068", cursor: "pointer" }}>
                  已支付保证金
                </span>
              ),
            filters: shopStatusOptions,
            onFilter: (value, shop) => shop.status === value,
          },
          {
            title: "店铺类型",
            dataIndex: "type",
            render: (value) => (
              <>{shopTypeOptions.find((item) => item.value === value)?.text}</>
            ),
            filters: shopTypeOptions,
            onFilter: (value, shop) => shop.type === value,
          },
          {
            title: "创建时间",
            render: (value, shop) => (
              <span>
                {shop.createdAt
                  ? dayjs(shop.createdAt).format("YYYY-MM-DD HH:mm:ss")
                  : "无"}
              </span>
            ),
            width: "20rem",
            sorter: (a, b) =>
              dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf(),
          },
          {
            title: "更新时间",
            render: (value, shop) => (
              <span>
                {shop.updatedAt
                  ? dayjs(shop.updatedAt).format("YYYY-MM-DD HH:mm:ss")
                  : "无"}
              </span>
            ),
            width: "20rem",
            sorter: (a, b) =>
              dayjs(a.updatedAt).valueOf() - dayjs(b.updatedAt).valueOf(),
          },
          {
            title: "操作",
            render(value, shop) {
              return <More id={shop.id} />;
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
  const { open } = useShopModal();
  const items: MenuProps["items"] = [
    {
      label: <div onClick={() => open(id)}>详情</div>,
      key: "detail",
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
