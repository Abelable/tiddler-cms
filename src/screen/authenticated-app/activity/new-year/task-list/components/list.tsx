import {
  Button,
  Dropdown,
  MenuProps,
  Modal,
  Table,
  TablePaginationConfig,
  TableProps,
  Image,
  InputNumber,
} from "antd";
import { ButtonNoPadding, ErrorBox, Row, PageTitle } from "components/lib";
import { PlusOutlined } from "@ant-design/icons";

import styled from "@emotion/styled";
import dayjs from "dayjs";
import {
  useDeleteTask,
  useEditSort,
  useUpTask,
  useDownTask,
} from "service/new-year/task";
import { useTaskModal, useTaskListQueryKey } from "../util";

import type { Task } from "types/new-year/task";
import type { Option } from "types/common";
import type { SearchPanelProps } from "./search-panel";

interface ListProps extends TableProps<Task>, SearchPanelProps {
  sceneOptions: Option[];
  error: Error | unknown;
}

export const List = ({
  typeOptions,
  sceneOptions,
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

  const { mutate: editSort } = useEditSort(useTaskListQueryKey());

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
            render: (value) =>
              value === 1 ? (
                <span style={{ color: "#87d068" }}>进行中</span>
              ) : (
                <span style={{ color: "#999" }}>已结束</span>
              ),
            width: "14rem",
          },
          {
            title: "图标",
            dataIndex: "icon",
            render: (value) => <Image width={58} src={value} />,
            width: "9rem",
          },
          {
            title: "名称",
            dataIndex: "name",
          },
          {
            title: "描述",
            dataIndex: "desc",
          },
          {
            title: "按钮文案",
            dataIndex: "btnContent",
            width: "12rem",
          },
          {
            title: "福气值",
            dataIndex: "luckScore",
            width: "12rem",
          },
          {
            title: "类型",
            dataIndex: "type",
            render: (value) => (
              <>{typeOptions.find((item) => item.value === +value)?.text}</>
            ),
            width: "12rem",
          },
          {
            title: "次数限制",
            dataIndex: "timeLimit",
            width: "12rem",
          },
          {
            title: "场景",
            dataIndex: "scene",
            render: (value) => (
              <>{sceneOptions.find((item) => item.value === +value)?.text}</>
            ),
            width: "12rem",
          },
          {
            title: "参数",
            dataIndex: "param",
          },
          {
            title: "排序",
            dataIndex: "sort",
            render: (value, category) => (
              <InputNumber
                value={value}
                onChange={(sort) => editSort({ id: category.id, sort })}
              />
            ),
            sorter: (a, b) => a.sort - b.sort,
            width: "12rem",
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
      title: "确定删除该task吗？",
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
  padding: 2.4rem;
  background: #fff;
  border-radius: 0.6rem;
`;

const Header = styled(Row)`
  margin-bottom: 2.4rem;
`;
