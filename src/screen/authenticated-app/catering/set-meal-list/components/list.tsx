import styled from "@emotion/styled";
import {
  Dropdown,
  Menu,
  MenuProps,
  Modal,
  Table,
  TablePaginationConfig,
  TableProps,
  Tooltip,
  Tag,
  Image,
} from "antd";
import { ButtonNoPadding, ErrorBox, Row, PageTitle } from "components/lib";
import dayjs from "dayjs";
import { useApprovedSetMeal, useDeleteSetMeal } from "service/setMeal";
import {
  useSetMealModal,
  useSetMealListQueryKey,
  useRejectModal,
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
            title: "价格",
            dataIndex: "price",
            render: (value) => <>{`¥${value}`}</>,
            width: "16rem",
          },
          {
            title: "销售佣金比例",
            dataIndex: "salesCommissionRate",
            render: (value) => <>{`${value}%`}</>,
            width: "16rem",
          },
          {
            title: "推广佣金比例",
            dataIndex: "promotionCommissionRate",
            render: (value) => <>{`${value}%`}</>,
            width: "16rem",
          },
          {
            title: "销量",
            dataIndex: "salesVolume",
            sorter: (a, b) => Number(a) - Number(b),
            width: "16rem",
          },
          {
            title: "状态",
            dataIndex: "status",
            render: (value, setMeal) =>
              value === 0 ? (
                <span style={{ color: "#87d068" }}>待审核</span>
              ) : value === 1 ? (
                <span style={{ color: "#296BEF" }}>售卖中</span>
              ) : (
                <Tooltip title={setMeal.failureReason}>
                  <span style={{ color: "#f50", cursor: "pointer" }}>
                    未过审
                  </span>
                </Tooltip>
              ),
            filters: statusOptions,
            onFilter: (value, setMeal) => setMeal.status === value,
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
  const { mutate: approvedSetMeal } = useApprovedSetMeal(
    useSetMealListQueryKey()
  );
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

  const confirmApproved = (id: number) => {
    Modal.confirm({
      title: "套餐审核通过确认",
      content: "请确保在套餐信息无误的情况下进行该操作",
      okText: "确定",
      cancelText: "取消",
      onOk: () => approvedSetMeal(id),
    });
  };

  let items: MenuProps["items"];
  switch (status) {
    case 0:
      items = [
        {
          label: <div onClick={() => open(id)}>详情</div>,
          key: "detail",
        },
        {
          label: <div onClick={() => confirmApproved(id)}>通过</div>,
          key: "approved",
        },
        {
          label: <div onClick={() => openRejectModal(id)}>驳回</div>,
          key: "reject",
        },

        {
          label: <div onClick={() => confirmDelete(id)}>删除</div>,
          key: "delete",
        },
      ];
      break;

    case 1:
      items = [
        {
          label: <div onClick={() => open(id)}>详情</div>,
          key: "detail",
        },
        {
          label: <div onClick={() => openRejectModal(id)}>驳回重审</div>,
          key: "reject",
        },
        {
          label: <div onClick={() => confirmDelete(id)}>删除</div>,
          key: "delete",
        },
      ];
      break;

    case 2:
      items = [
        {
          label: <div onClick={() => open(id)}>详情</div>,
          key: "detail",
        },
        {
          label: <div onClick={() => confirmDelete(id)}>删除</div>,
          key: "delete",
        },
      ];
      break;
  }

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
`;

const Header = styled(Row)`
  margin-bottom: 2.4rem;
`;
