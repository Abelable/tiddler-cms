import styled from "@emotion/styled";
import {
  Dropdown,
  MenuProps,
  Modal,
  Table,
  TablePaginationConfig,
  TableProps,
  Image,
  Avatar,
} from "antd";
import { ButtonNoPadding, ErrorBox, Row, PageTitle } from "components/lib";
import { ShopOutlined } from "@ant-design/icons";

import dayjs from "dayjs";
import { useShopScenicListQueryKey, useRejectModal } from "../util";
import {
  useApproveShopScenic,
  useDeleteShopScenic,
} from "service/providerScenic";

import type { ShopScenic } from "types/providerScenic";
import type { SearchPanelProps } from "./search-panel";

interface ListProps extends TableProps<ShopScenic>, SearchPanelProps {
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
        <PageTitle>景点申请</PageTitle>
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
            title: "景点图片",
            dataIndex: "scenicImage",
            render: (value) => <Image width={68} src={value} />,
            width: "10rem",
          },
          {
            title: "景点名称",
            dataIndex: "scenicName",
            width: "32rem",
          },
          {
            title: "店铺logo",
            dataIndex: "shopLogo",
            render: (value) => <Avatar src={value} icon={<ShopOutlined />} />,
            width: "10rem",
          },
          {
            title: "店铺名称",
            dataIndex: "shopName",
            width: "24rem",
          },
          {
            title: "服务商名称",
            dataIndex: "merchantName",
            width: "32rem",
          },
          {
            title: "服务商资质",
            dataIndex: "businessLicense",
            render: (value) => <Image width={68} src={value} />,
            width: "12rem",
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
            onFilter: (value, scenic) => scenic.status === value,
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
  const { mutate: approveShopScenic } = useApproveShopScenic(
    useShopScenicListQueryKey()
  );
  const { mutate: deleteShopScenic } = useDeleteShopScenic(
    useShopScenicListQueryKey()
  );
  const { open: openRejectModal } = useRejectModal();

  const confirmApprove = (id: number) => {
    Modal.confirm({
      title: "景点申请通过确认",
      content: "请确保在服务商有景点相关资质的情况下进行该操作",
      okText: "确定",
      cancelText: "取消",
      onOk: () => approveShopScenic(id),
    });
  };

  const confirmDelete = (id: number) => {
    Modal.confirm({
      title: "确定删除该景点申请吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => deleteShopScenic(id),
    });
  };

  const items: MenuProps["items"] =
    status === 0
      ? [
          {
            label: <div onClick={() => confirmApprove(id)}>通过</div>,
            key: "approve",
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
