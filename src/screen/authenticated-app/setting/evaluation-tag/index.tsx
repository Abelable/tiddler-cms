import styled from "@emotion/styled";
import { useEvaluationTagList } from "service/evaluationTag";
import { toNumber } from "utils";
import { List } from "./components/list";
import { EvaluationTagModal } from "./components/evaluation-tag-modal";
import { useEvaluationTagListSearchParams } from "./util";
import { SearchPanel } from "./components/search-panel";

const sceneOptions = [
  { text: "景点评价", value: 1 },
  { text: "酒店评价", value: 2 },
  { text: "餐饮门店评价", value: 3 },
  { text: "商品评价", value: 4 },
  { text: "家乡代言人评价", value: 5 },
];
const typeOptions = [
  { text: "好评", value: 1 },
  { text: "中评", value: 2 },
  { text: "差评", value: 3 },
];

export const EvaluationTagList = () => {
  const [params, setParams] = useEvaluationTagListSearchParams();
  const { isLoading, error, data } = useEvaluationTagList(params);

  return (
    <Container>
      <Main>
        <SearchPanel
          sceneOptions={sceneOptions}
          typeOptions={typeOptions}
          params={params}
          setParams={setParams}
        />
        <List
          sceneOptions={sceneOptions}
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
      <EvaluationTagModal
        sceneOptions={sceneOptions}
        typeOptions={typeOptions}
      />
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
