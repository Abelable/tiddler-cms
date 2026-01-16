import {
  MenuProps,
  Button,
  Modal,
  Table,
  TablePaginationConfig,
  TableProps,
  Image,
  InputNumber,
  Dropdown,
} from "antd";
import { ErrorBox, Row, PageTitle, ButtonNoPadding } from "components/lib";
import { PlusOutlined } from "@ant-design/icons";

import styled from "@emotion/styled";
import dayjs from "dayjs";
import {
  useDeleteNewYearGoods,
  useDownNewYearGoods,
  useEditLuckScore,
  useEditSort,
  useUpNewYearGoods,
} from "service/new-year/goods";
import { useNewYearGoodsModal, useNewYearGoodsListQueryKey } from "../util";

import type {
  NewYearGoods,
  NewYearGoodsListSearchParams,
} from "types/new-year/goods";

interface ListProps extends TableProps<NewYearGoods> {
  params: Partial<NewYearGoodsListSearchParams>;
  setParams: (params: Partial<NewYearGoodsListSearchParams>) => void;
  error: Error | unknown;
}

export const List = ({ error, params, setParams, ...restProps }: ListProps) => {
  const { open } = useNewYearGoodsModal();

  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      limit: pagination.pageSize,
    });

  const { mutate: editLuckScore } = useEditLuckScore(
    useNewYearGoodsListQueryKey()
  );
  const { mutate: editSort } = useEditSort(useNewYearGoodsListQueryKey());

  return (
    <Container>
      <Header between={true}>
        <PageTitle>兑换商品</PageTitle>
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
            title: "状态",
            dataIndex: "status",
            render: (value) =>
              value === 1 ? (
                <span style={{ color: "#87d068" }}>上架中</span>
              ) : (
                <span style={{ color: "#999" }}>已下架</span>
              ),
            width: "10rem",
          },
          {
            title: "商品信息",
            children: [
              {
                title: "id",
                dataIndex: "goodsId",
                width: "8rem",
              },
              {
                title: "封面",
                dataIndex: "cover",
                width: "12rem",
                render: (value) => <Image width={68} src={value} />,
              },
              {
                title: "名称",
                dataIndex: "name",
              },
            ],
          },
          {
            title: "所需福气值",
            dataIndex: "luckScore",
            render: (value, goods) => (
              <InputNumber
                value={value}
                onChange={(luckScore) =>
                  editLuckScore({ id: goods.id, luckScore })
                }
              />
            ),
          },
          {
            title: "排序",
            dataIndex: "sort",
            render: (value, goods) => (
              <InputNumber
                value={value}
                onChange={(sort) => editSort({ id: goods.id, sort })}
              />
            ),
            sorter: (a, b) => a.sort - b.sort,
            width: "12rem",
          },
          {
            title: "创建时间",
            render: (value, goods) => (
              <span>
                {goods.createdAt
                  ? dayjs(goods.createdAt).format("YYYY-MM-DD HH:mm:ss")
                  : "无"}
              </span>
            ),
            sorter: (a, b) =>
              dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf(),
          },
          {
            title: "操作",
            render(value, goods) {
              return <More id={goods.id} status={goods.status} />;
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

const More = ({ id, status }: { id: number; status: number }) => {
  const { mutate: upNewYearGoods } = useUpNewYearGoods(
    useNewYearGoodsListQueryKey()
  );
  const { mutate: downNewYearGoods } = useDownNewYearGoods(
    useNewYearGoodsListQueryKey()
  );
  const { mutate: deleteNewYearGoods } = useDeleteNewYearGoods(
    useNewYearGoodsListQueryKey()
  );

  const confirmDelete = (id: number) => {
    Modal.confirm({
      title: "确定删除该商品吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => deleteNewYearGoods(id),
    });
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <div
          onClick={() =>
            status === 1 ? downNewYearGoods(id) : upNewYearGoods(id)
          }
        >
          {status === 1 ? "下架" : "上架"}
        </div>
      ),
      key: "status",
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
  border-radius: 0.6rem;
`;

const Header = styled(Row)`
  margin-bottom: 2.4rem;
`;
