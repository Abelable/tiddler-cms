import styled from "@emotion/styled";
import { useEvaluationTagList } from "service/evaluationTag";
import { toNumber } from "utils";
import { List } from "./components/list";
import { EvaluationTagModal } from "./components/evaluation-tag-modal";
import { useEvaluationTagListSearchParams } from "./util";

export const EvaluationTagList = () => {
  const [params, setParams] = useEvaluationTagListSearchParams();
  const { isLoading, error, data } = useEvaluationTagList(params);

  return (
    <Container>
      <Main>
        <List
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
      <EvaluationTagModal />
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
