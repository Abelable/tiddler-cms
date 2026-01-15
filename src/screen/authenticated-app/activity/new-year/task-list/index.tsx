import { TaskModal } from "./components/task-modal";
import { List } from "./components/list";

import styled from "@emotion/styled";
import { useTaskList } from "service/new-year/task";
import { toNumber } from "utils";
import { useTaskListSearchParams } from "./util";

const typeOptions = [
  { text: "页面跳转", value: 1 },
  { text: "加微信群", value: 2 },
];

export const NewYearTaskList = () => {
  const [params, setParams] = useTaskListSearchParams();
  const { isLoading, error, data } = useTaskList(params);

  return (
    <Container>
      <Main>
        <List
          typeOptions={typeOptions}
          params={params}
          setParams={setParams}
          error={error}
          loading={isLoading}
          dataSource={data?.list}
          pagination={{
            current: toNumber(data?.page) || 1,
            pageSize: toNumber(data?.limit),
            total: toNumber(data?.total),
          }}
          bordered
        />
      </Main>
      <TaskModal typeOptions={typeOptions} />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  height: 100%;
`;

const Main = styled.div`
  padding: 2.4rem;
  height: 100%;
  overflow: scroll;
`;
