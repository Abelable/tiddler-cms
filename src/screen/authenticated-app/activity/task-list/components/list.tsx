import {
  Button,
  Dropdown,
  MenuProps,
  Modal,
  Table,
  TablePaginationConfig,
  TableProps,
  Tag,
} from "antd";
import { ButtonNoPadding, ErrorBox, Row, PageTitle } from "components/lib";
import { PlusOutlined } from "@ant-design/icons";

import styled from "@emotion/styled";
import dayjs from "dayjs";
import { useDeleteTask, useDownTask, useUpTask } from "service/task";
import { useTaskModal, useTaskListQueryKey } from "../util";

import type { Task } from "types/task";
import type { SearchPanelProps } from "./search-panel";

interface ListProps extends TableProps<Task>, SearchPanelProps {
  error: Error | unknown;
}

export const List = ({
  statusOptions,
  merchantTypeOptions,
  error,
  params,
  setParams,
  ...restProps
}: ListProps) => {
  const { open } = useTaskModal();

  const setPagination = (pagination: TablePaginationConfig) =>
    setParams({
      ...params,
      page: pagination.current,
      limit: pagination.pageSize,
    });

  return (
    <Container>
      <Header between={true}>
        <PageTitle>任务列表</PageTitle>
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
            fixed: "left",
          },
          {
            title: "任务状态",
            dataIndex: "status",
            render: (value) =>
              value === 1 ? (
                <span style={{ color: "#87d068" }}>进行中</span>
              ) : (
                <span style={{ color: "#999" }}>
                  {statusOptions.find((item) => item.value === +value)?.text}
                </span>
              ),
            width: "14rem",
          },
          {
            title: "任务奖励",
            dataIndex: "rewardTotal",
            render: (value) => <>{`¥${value}`}</>,
            width: "16rem",
          },
          {
            title: "商家类型",
            dataIndex: "merchantType",
            render: (value) => (
              <Tag>
                {
                  merchantTypeOptions.find((item) => item.value === +value)
                    ?.text
                }
              </Tag>
            ),
            width: "16rem",
          },
          {
            title: "商家名称",
            dataIndex: "merchantName",
          },
          {
            title: "更新时间",
            render: (value, task) => (
              <span>
                {task.updatedAt
                  ? dayjs(task.updatedAt).format("YYYY-MM-DD HH:mm:ss")
                  : "无"}
              </span>
            ),
            width: "20rem",
            sorter: (a, b) =>
              dayjs(a.updatedAt).valueOf() - dayjs(b.updatedAt).valueOf(),
          },
          {
            title: "创建时间",
            render: (value, task) => (
              <span>
                {task.createdAt
                  ? dayjs(task.createdAt).format("YYYY-MM-DD HH:mm:ss")
                  : "无"}
              </span>
            ),
            width: "20rem",
            sorter: (a, b) =>
              dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf(),
          },
          {
            title: "操作",
            render(value, task) {
              return <More id={task.id} status={task.status} />;
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
  const { startEdit } = useTaskModal();
  const { mutate: upTask } = useUpTask(useTaskListQueryKey());
  const { mutate: downTask } = useDownTask(useTaskListQueryKey());
  const { mutate: deleteTask } = useDeleteTask(useTaskListQueryKey());

  const confirmDelete = (id: number) => {
    Modal.confirm({
      title: "确定删除该任务吗？",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk: () => deleteTask(id),
    });
  };

  const items: MenuProps["items"] = [
    {
      label: <div onClick={() => startEdit(id)}>编辑</div>,
      key: "edit",
    },
    {
      label: (
        <div onClick={() => (status === 1 ? downTask(id) : upTask(id))}>
          {status === 1 ? "结束" : "恢复"}
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
  margin-top: 2.4rem;
  padding: 2.4rem;
  background: #fff;
  border-radius: 0.6rem;
`;

const Header = styled(Row)`
  margin-bottom: 2.4rem;
`;
