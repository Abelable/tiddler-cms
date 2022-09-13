import { useHome } from "service/home";
import { useHomeSearchParams } from "./util";

import { SearchPanel } from "./components/search-panel";
import { List } from "./components/list";
import styled from "@emotion/styled";
import { useAgentOptions } from "service/agent";
import { useGoodsOptions } from "service/product";

export const Home = () => {
  const [params, setParams] = useHomeSearchParams();
  const agentOptions = useAgentOptions();
  const goodsOptions = useGoodsOptions();
  const { data, isLoading, error } = useHome(params);

  return (
    <Container>
      <Main>
        <SearchPanel
          agentOptions={agentOptions}
          goodsOptions={goodsOptions}
          params={params}
          setParams={setParams}
        />
        <List
          params={params}
          error={error}
          dataSource={data?.list}
          total={data?.total}
          loading={isLoading}
        />
      </Main>
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
