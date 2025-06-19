import {
  Image,
  Dropdown,
  MenuProps,
  Modal,
  Table,
  TablePaginationConfig,
  TableProps,
  Tooltip,
  Button,
  InputNumber,
  Rate,
  Popover,
  Tag,
} from "antd";
import {
  ButtonNoPadding,
  ErrorBox,
  Row,
  PageTitle,
  Card,
  OptionCover,
} from "components/lib";
import { PlusOutlined } from "@ant-design/icons";
import { SearchPanelProps } from "./search-panel";

import styled from "@emotion/styled";
import dayjs from "dayjs";
import {
  useDeleteGoods,
  useEditGoodsCommission,
  useEditViews,
} from "service/goods";
import {
  useApproveModal,
  useGoodsDetailModal,
  useGoodsListQueryKey,
  useGoodsModal,
  useRejectModal,
} from "../util";

import type { Goods } from "types/goods";

interface ListProps extends TableProps<Goods>, SearchPanelProps {
  error: Error | unknown;
}

export const List = ({
  statusOptions,
  shopCategoryOptions,
  goodsCategoryOptions,
  shopOptions,
  error,
  params,
  setParams,
  ...restProps
}: ListProps) => {
  const { open } = useGoodsModal();
  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      limit: pagination.pageSize,
    });
  const { mutate: editViews } = useEditViews(useGoodsListQueryKey());
  const { mutate: editCommission } = useEditGoodsCommission(
    useGoodsListQueryKey()
  );

  return (
    <Container>
      <Header between={true}>
        <PageTitle>商品列表</PageTitle>
        <Button onClick={() => open()} type={"primary"} icon={<PlusOutlined />}>
          新增自营商品
        </Button>
      </Header>
      <ErrorBox error={error} />
      <Table
        rowKey={"id"}
        scroll={{ x: 2000 }}
        columns={[
          {
            title: "id",
            dataIndex: "id",
            width: "8rem",
            fixed: "left",
          },
          {
            title: "状态",
            dataIndex: "status",
            render: (value, goods) =>
              value === 0 ? (
                <span style={{ color: "#faad14" }}>待审核</span>
              ) : value === 1 ? (
                <span style={{ color: "#296BEF" }}>售卖中</span>
              ) : (
                <Tooltip title={goods.failureReason}>
                  <span style={{ color: "#f50", cursor: "pointer" }}>
                    未过审
                  </span>
                </Tooltip>
              ),
            filters: [
              { text: "待审核", value: 0 },
              { text: "售卖中", value: 1 },
              { text: "未过审", value: 2 },
            ],
            onFilter: (value, goods) => goods.status === value,
            width: "12rem",
          },
          {
            title: "店铺",
            dataIndex: "shopId",
            render: (value) => {
              const shop = shopOptions.find((item) => item.id === value);
              return shop?.id === 0 ? (
                <img
                  style={{ width: "6.8rem" }}
                  src="https://static.tiddler.cn/mp/self_support.png"
                  alt=""
                />
              ) : (
                <Popover content={`id: ${shop?.id}`}>
                  <Card>
                    <OptionCover src={shop?.logo} />
                    <div>{shop?.name}</div>
                  </Card>
                </Popover>
              );
            },
            width: "18rem",
          },
          {
            title: "图片",
            dataIndex: "cover",
            render: (value) => <Image width={68} src={value} />,
            width: "14rem",
          },
          {
            title: "名称",
            dataIndex: "name",
            width: "32rem",
          },
          {
            title: "一级分类",
            dataIndex: "shopCategoryId",
            render: (value) => (
              <Tag>
                {shopCategoryOptions.find((item) => item.id === value)?.name}
              </Tag>
            ),
            width: "12rem",
          },
          {
            title: "二级分类",
            dataIndex: "categoryId",
            render: (value) => (
              <Tag>
                {goodsCategoryOptions.find((item) => item.id === value)?.name}
              </Tag>
            ),
            width: "12rem",
          },
          {
            title: "价格",
            dataIndex: "price",
            render: (value) => <>{`¥${value}`}</>,
            width: "12rem",
          },
          {
            title: "销售佣金比例",
            dataIndex: "salesCommissionRate",
            render: (value, goods) =>
              goods.shopId ? (
                <>{`${value}%`}</>
              ) : (
                <InputNumber
                  value={value}
                  onChange={(salesCommissionRate) =>
                    editCommission({ id: goods.id, salesCommissionRate })
                  }
                  suffix="%"
                />
              ),
            width: "12rem",
          },
          {
            title: "代言奖励",
            children: [
              {
                title: "比例",
                dataIndex: "promotionCommissionRate",
                render: (value, goods) => {
                  const { minSalesCommissionRate, maxSalesCommissionRate } =
                    goodsCategoryOptions.find(
                      (item) => item.id === goods.categoryId
                    ) || {};

                  return (
                    <InputNumber
                      min={minSalesCommissionRate}
                      max={maxSalesCommissionRate}
                      value={value}
                      onChange={(promotionCommissionRate) =>
                        editCommission({
                          id: goods.id,
                          promotionCommissionRate,
                        })
                      }
                      suffix="%"
                    />
                  );
                },
                width: "12rem",
              },
              {
                title: "上限",
                dataIndex: "promotionCommissionUpperLimit",
                render: (value, goods) => (
                  <InputNumber
                    value={value}
                    onChange={(promotionCommissionUpperLimit) =>
                      editCommission({
                        id: goods.id,
                        promotionCommissionUpperLimit,
                      })
                    }
                    prefix="￥"
                  />
                ),
                width: "12rem",
              },
            ],
          },
          {
            title: "上级代言奖励",
            children: [
              {
                title: "比例",
                dataIndex: "superiorPromotionCommissionRate",
                render: (value, goods) => (
                  <InputNumber
                    value={value}
                    onChange={(superiorPromotionCommissionRate) =>
                      editCommission({
                        id: goods.id,
                        superiorPromotionCommissionRate,
                      })
                    }
                    suffix="%"
                  />
                ),
                width: "12rem",
              },
              {
                title: "上限",
                dataIndex: "superiorPromotionCommissionUpperLimit",
                render: (value, goods) => (
                  <InputNumber
                    value={value}
                    onChange={(superiorPromotionCommissionUpperLimit) =>
                      editCommission({
                        id: goods.id,
                        superiorPromotionCommissionUpperLimit,
                      })
                    }
                    prefix="￥"
                  />
                ),
                width: "12rem",
              },
            ],
          },

          {
            title: "库存",
            dataIndex: "stock",
            width: "12rem",
          },
          {
            title: "销量",
            dataIndex: "salesVolume",
            sorter: (a, b) => Number(a) - Number(b),
            width: "12rem",
          },
          {
            title: "评分",
            dataIndex: "score",
            width: "22rem",
            render: (value) => (
              <>
                <Rate allowHalf value={value} />
                <span style={{ marginLeft: "1rem" }}>{value}</span>
              </>
            ),
          },
          {
            title: "访问量",
            dataIndex: "views",
            render: (value, goods) => (
              <InputNumber
                value={value}
                onChange={(views) => editViews({ id: goods.id, views })}
              />
            ),
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
            width: "20rem",
            sorter: (a, b) =>
              dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf(),
          },
          {
            title: "更新时间",
            render: (value, goods) => (
              <span>
                {goods.updatedAt
                  ? dayjs(goods.updatedAt).format("YYYY-MM-DD HH:mm:ss")
                  : "无"}
              </span>
            ),
            width: "20rem",
            sorter: (a, b) =>
              dayjs(a.updatedAt).valueOf() - dayjs(b.updatedAt).valueOf(),
          },
          {
            title: "操作",
            render(value, goods) {
              return <More goods={goods} />;
            },
            width: "8rem",
            fixed: "right",
          },
        ]}
        onChange={setPagination}
        {...restProps}
      />
    </Container>
  );
};

const More = ({ goods }: { goods: Goods }) => {
  const { id, status, shopId } = goods;
  const { startEdit } = useGoodsModal();
  const { open } = useGoodsDetailModal();
  const { mutate: deleteGoods } = useDeleteGoods(useGoodsListQueryKey());
  const { open: openApproveModal } = useApproveModal();
  const { open: openRejectModal } = useRejectModal();

  const confirmDelete = (id: number) => {
    Modal.confirm({
      title: "确定删除该商品吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => deleteGoods(id),
    });
  };

  const items = [
    status === 0
      ? {
          label: <div onClick={() => openApproveModal(id)}>通过</div>,
          key: "approve",
        }
      : undefined,
    status === 0
      ? {
          label: <div onClick={() => openRejectModal(id)}>驳回</div>,
          key: "reject",
        }
      : undefined,
    shopId
      ? {
          label: <div onClick={() => open(id)}>详情</div>,
          key: "detail",
        }
      : {
          label: <div onClick={() => startEdit(id)}>编辑</div>,
          key: "edit",
        },
    {
      label: <div onClick={() => confirmDelete(id)}>删除</div>,
      key: "delete",
    },
  ].filter((item) => item !== undefined) as MenuProps["items"];

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
