import {
  Button,
  Modal,
  Table,
  TablePaginationConfig,
  TableProps,
  Image,
} from "antd";
import { ErrorBox, Row, PageTitle } from "components/lib";
import { PlusOutlined } from "@ant-design/icons";

import styled from "@emotion/styled";
import dayjs from "dayjs";
import { useDeleteGiftGoods } from "service/giftGoods";
import { useGiftGoodsModal, useGiftGoodsListQueryKey } from "../util";

import type { Goods, GoodsListSearchParams } from "types/giftGoods";
import type { Option } from "types/common";

interface ListProps extends TableProps<Goods> {
  typeOptions: Option[];
  params: Partial<GoodsListSearchParams>;
  setParams: (params: Partial<GoodsListSearchParams>) => void;
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
        <PageTitle>礼包商品</PageTitle>
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
            title: "礼包类型",
            dataIndex: "type",
            render: (value) => (
              <>{typeOptions.find((item) => item.value === value)?.text}</>
            ),
          },
          {
            title: "商品id",
            dataIndex: "goodsId",
          },
          {
            title: "商品封面",
            dataIndex: "goodsCover",
            render: (value) => <Image width={68} src={value} />,
          },
          {
            title: "商品名称",
            dataIndex: "goodsName",
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
