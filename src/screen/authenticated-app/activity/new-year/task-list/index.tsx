import { TaskModal } from "./components/task-modal";
import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";

import styled from "@emotion/styled";
import { useTaskList } from "service/new-year/task";
import { toNumber } from "utils";
import { useTaskListSearchParams } from "./util";

const typeOptions = [
  { text: "单次任务", value: 1 },
  { text: "每日任务", value: 2 },
  { text: "重复任务", value: 3 },
];
const sceneOptions = [
  { text: "页面跳转", value: 1 },
  { text: "加微信群", value: 2 },
];

export const NewYearTaskList = () => {
  const [params, setParams] = useTaskListSearchParams();
  const { isLoading, error, data } = useTaskList(params);

  return (
    <Container>
      <Main>
        <SearchPanel
          typeOptions={typeOptions}
          params={params}
          setParams={setParams}
        />
        <List
          typeOptions={typeOptions}
          sceneOptions={sceneOptions}
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
      <TaskModal typeOptions={typeOptions} sceneOptions={sceneOptions} />
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
