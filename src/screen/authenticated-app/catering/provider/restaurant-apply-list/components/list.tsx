import styled from "@emotion/styled";
import {
  Dropdown,
  MenuProps,
  Modal,
  Table,
  TablePaginationConfig,
  TableProps,
  Image,
} from "antd";
import { ButtonNoPadding, ErrorBox, Row, PageTitle } from "components/lib";
import dayjs from "dayjs";
import { ProviderRestaurant } from "types/providerRestaurant";
import { useProviderRestaurantListQueryKey, useRejectModal } from "../util";
import { SearchPanelProps } from "./search-panel";
import {
  useApprovedProviderRestaurant,
  useDeleteProviderRestaurant,
} from "service/providerRestaurant";

interface ListProps extends TableProps<ProviderRestaurant>, SearchPanelProps {
  error: Error | unknown;
}

export const List = ({
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
        <PageTitle>门店申请列表</PageTitle>
      </Header>
      <ErrorBox error={error} />
      <Table
        rowKey={"id"}
        scroll={{ x: 1600 }}
        columns={[
          {
            title: "id",
            dataIndex: "id",
            width: "8rem",
            fixed: "left",
          },
          {
            title: "门店图片",
            dataIndex: "restaurantImage",
            render: (value) => <Image width={68} src={value} />,
            width: "14rem",
          },
          {
            title: "门店名称",
            dataIndex: "restaurantName",
            width: "32rem",
          },
          {
            title: "申请服务商",
            dataIndex: "providerCompanyName",
            width: "32rem",
            render: (value) => <>{value || "个体商户"}</>,
          },
          {
            title: "服务商资质",
            dataIndex: "providerBusinessLicensePhoto",
            render: (value) => <Image width={68} src={value} />,
            width: "14rem",
          },
          {
            title: "状态",
            dataIndex: "status",
            render: (value) => (
              <span style={{ color: statusOptions[value].color }}>
                {statusOptions[value].text}
              </span>
            ),
            filters: statusOptions,
            onFilter: (value, restaurant) => restaurant.status === value,
            width: "12rem",
          },
          {
            title: "申请时间",
            render: (value, provider) => (
              <span>
                {provider.createdAt
                  ? dayjs(provider.createdAt).format("YYYY-MM-DD HH:mm:ss")
                  : "无"}
              </span>
            ),
            width: "20rem",
            sorter: (a, b) =>
              dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf(),
          },
          {
            title: "更新时间",
            render: (value, provider) => (
              <span>
                {provider.updatedAt
                  ? dayjs(provider.updatedAt).format("YYYY-MM-DD HH:mm:ss")
                  : "无"}
              </span>
            ),
            width: "20rem",
            sorter: (a, b) =>
              dayjs(a.updatedAt).valueOf() - dayjs(b.updatedAt).valueOf(),
          },
          {
            title: "操作",
            render(value, provider) {
              return <More id={provider.id} status={provider.status} />;
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
  const { mutate: approvedProviderRestaurant } = useApprovedProviderRestaurant(
    useProviderRestaurantListQueryKey()
  );
  const { mutate: deleteProviderRestaurant } = useDeleteProviderRestaurant(
    useProviderRestaurantListQueryKey()
  );
  const { open: openRejectModal } = useRejectModal();

  const confirmApproved = (id: number) => {
    Modal.confirm({
      title: "门店申请通过确认",
      content: "请确保在服务商有门店相关资质的情况下进行该操作",
      okText: "确定",
      cancelText: "取消",
      onOk: () => approvedProviderRestaurant(id),
    });
  };

  const confirmDelete = (id: number) => {
    Modal.confirm({
      title: "确定删除该门店申请吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => deleteProviderRestaurant(id),
    });
  };

  const items: MenuProps["items"] =
    status === 0
      ? [
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
        ]
      : [
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
  margin-top: 2.4rem;
  padding: 2.4rem;
  background: #fff;
  border-radius: 0.6rem;
`;

const Header = styled(Row)`
  margin-bottom: 2.4rem;
`;
