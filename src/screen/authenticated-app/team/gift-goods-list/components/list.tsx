import {
  Button,
  Modal,
  Table,
  TablePaginationConfig,
  TableProps,
  Image,
  InputNumber,
} from "antd";
import { ErrorBox, Row, PageTitle } from "components/lib";
import { PlusOutlined } from "@ant-design/icons";

import styled from "@emotion/styled";
import dayjs from "dayjs";
import {
  useDeleteGiftGoods,
  useEditDuration,
  useEditSort,
} from "service/giftGoods";
import { useGiftGoodsModal, useGiftGoodsListQueryKey } from "../util";

import type { GiftGoods, GiftGoodsListSearchParams } from "types/giftGoods";
import type { DataOption } from "types/common";

interface ListProps extends TableProps<GiftGoods> {
  typeOptions: DataOption[];
  params: Partial<GiftGoodsListSearchParams>;
  setParams: (params: Partial<GiftGoodsListSearchParams>) => void;
  error: Error | unknown;
}

export const List = ({
  typeOptions,
  error,
  params,
  setParams,
  ...restProps
}: ListProps) => {
  const { open } = useGiftGoodsModal();

  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      limit: pagination.pageSize,
    });

  const { mutate: editDuration } = useEditDuration(useGiftGoodsListQueryKey());
  const { mutate: editSort } = useEditSort(useGiftGoodsListQueryKey());

  const { mutate: deleteIntegrityGoods } = useDeleteGiftGoods(
    useGiftGoodsListQueryKey()
  );

  const confirmDelete = (id: number) => {
    Modal.confirm({
      title: "确定删除该商品吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => deleteIntegrityGoods(id),
    });
  };

  return (
    <Container>
      <Header between={true}>
        <PageTitle>家乡好物</PageTitle>
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
            title: "好物类型",
            dataIndex: "typeId",
            render: (value) => (
              <>{typeOptions.find((item) => item.id === value)?.name}</>
            ),
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
                dataIndex: "goodsCover",
                width: "12rem",
                render: (value) => <Image width={68} src={value} />,
              },
              {
                title: "名称",
                dataIndex: "goodsName",
              },
            ],
          },
          {
            title: "代言时长（天）",
            dataIndex: "duration",
            render: (value, giftGoods) => (
              <InputNumber
                value={value}
                onChange={(duration) =>
                  editDuration({ id: giftGoods.id, duration })
                }
              />
            ),
          },
          {
            title: "排序",
            dataIndex: "sort",
            render: (value, giftGoods) => (
              <InputNumber
                value={value}
                onChange={(sort) => editSort({ id: giftGoods.id, sort })}
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
              return (
                <Button
                  onClick={() => confirmDelete(goods.id)}
                  type="link"
                  danger
                >
                  删除
                </Button>
              );
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

const Container = styled.div`
  padding: 2.4rem;
  background: #fff;
`;

const Header = styled(Row)`
  margin-bottom: 2.4rem;
`;
