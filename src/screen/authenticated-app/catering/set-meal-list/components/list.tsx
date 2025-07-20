import styled from "@emotion/styled";
import {
  Dropdown,
  MenuProps,
  Modal,
  Table,
  TablePaginationConfig,
  TableProps,
  Tooltip,
  Tag,
  Image,
  InputNumber,
} from "antd";
import { ButtonNoPadding, ErrorBox, Row, PageTitle } from "components/lib";
import dayjs from "dayjs";
import { useDeleteSetMeal, useEditSetMealCommission } from "service/setMeal";
import {
  useSetMealModal,
  useSetMealListQueryKey,
  useRejectModal,
  useApproveModal,
} from "../util";
import { SearchPanelProps } from "./search-panel";

import type { SetMeal } from "types/setMeal";

interface ListProps extends TableProps<SetMeal>, SearchPanelProps {
  error: Error | unknown;
}

export const List = ({
  restaurantOptions,
  statusOptions,
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

  const { mutate: editCommission } = useEditSetMealCommission(
    useSetMealListQueryKey()
  );

  return (
    <Container>
      <Header between={true}>
        <PageTitle>套餐列表</PageTitle>
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
            title: "图片",
            dataIndex: "cover",
            render: (value) => <Image width={68} src={value} />,
            width: "14rem",
          },
          {
            title: "名称",
            dataIndex: "name",
            width: "28rem",
          },
          {
            title: "关联门店",
            dataIndex: "restaurantIds",
            render: (restaurantIds) => (
              <>
                {restaurantIds.map((id: number) => (
                  <Tag color="success" key={id}>
                    {restaurantOptions.find((item) => item.id === id)?.name}
                  </Tag>
                ))}
              </>
            ),
            width: "36rem",
          },
          {
            title: "状态",
            dataIndex: "status",
            render: (value, setMeal) =>
              value === 0 ? (
                <span style={{ color: "#faad14" }}>待审核</span>
              ) : value === 1 ? (
                <span style={{ color: "#296BEF" }}>售卖中</span>
              ) : (
                <Tooltip title={setMeal.failureReason}>
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
            onFilter: (value, setMeal) => setMeal.status === value,
            width: "12rem",
          },
          {
            title: "价格",
            dataIndex: "price",
            render: (value) => <>{`¥${value}`}</>,
            width: "16rem",
          },
          {
            title: "销售佣金比例",
            dataIndex: "salesCommissionRate",
            render: (value) => <>{`${value}%`}</>,
            width: "12rem",
          },
          {
            title: "代言奖励",
            children: [
              {
                title: "比例",
                dataIndex: "promotionCommissionRate",
                render: (value, setMeal) => {
                  return (
                    <InputNumber
                      min={5}
                      max={30}
                      value={value}
                      onChange={(promotionCommissionRate) =>
                        editCommission({
                          id: setMeal.id,
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
                render: (value, setMeal) => {
                  return (
                    <InputNumber
                      max={30}
                      value={value}
                      onChange={(promotionCommissionUpperLimit) =>
                        editCommission({
                          id: setMeal.id,
                          promotionCommissionUpperLimit,
                        })
                      }
                      prefix="￥"
                    />
                  );
                },
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
                render: (value, setMeal) => {
                  return (
                    <InputNumber
                      min={5}
                      max={10}
                      value={value}
                      onChange={(superiorPromotionCommissionRate) =>
                        editCommission({
                          id: setMeal.id,
                          superiorPromotionCommissionRate,
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
                dataIndex: "superiorPromotionCommissionUpperLimit",
                render: (value, setMeal) => {
                  return (
                    <InputNumber
                      max={10}
                      value={value}
                      onChange={(superiorPromotionCommissionUpperLimit) =>
                        editCommission({
                          id: setMeal.id,
                          superiorPromotionCommissionUpperLimit,
                        })
                      }
                      prefix="￥"
                    />
                  );
                },
                width: "12rem",
              },
            ],
          },
          {
            title: "销量",
            dataIndex: "salesVolume",
            sorter: (a, b) => Number(a) - Number(b),
            width: "16rem",
          },
          {
            title: "创建时间",
            render: (value, setMeal) => (
              <span>
                {setMeal.createdAt
                  ? dayjs(setMeal.createdAt).format("YYYY-MM-DD HH:mm:ss")
                  : "无"}
              </span>
            ),
            width: "20rem",
            sorter: (a, b) =>
              dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf(),
          },
          {
            title: "更新时间",
            render: (value, setMeal) => (
              <span>
                {setMeal.updatedAt
                  ? dayjs(setMeal.updatedAt).format("YYYY-MM-DD HH:mm:ss")
                  : "无"}
              </span>
            ),
            width: "20rem",
            sorter: (a, b) =>
              dayjs(a.updatedAt).valueOf() - dayjs(b.updatedAt).valueOf(),
          },
          {
            title: "操作",
            render(value, setMeal) {
              return <More id={setMeal.id} status={setMeal.status} />;
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

const More = ({ id, status }: { id: number; status: number }) => {
  const { open } = useSetMealModal();
  const { mutate: deleteSetMeal } = useDeleteSetMeal(useSetMealListQueryKey());
  const { open: openApproveModal } = useApproveModal();
  const { open: openRejectModal } = useRejectModal();

  const confirmDelete = (id: number) => {
    Modal.confirm({
      title: "确定删除该套餐吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => deleteSetMeal(id),
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
    {
      label: <div onClick={() => open(id)}>详情</div>,
      key: "detail",
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
