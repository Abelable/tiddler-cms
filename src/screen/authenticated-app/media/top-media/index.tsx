import { TopMediaModal } from "./components/top-media-modal";
import { List } from "./components/list";

import styled from "@emotion/styled";
import { useTopMediaList } from "service/topMedia";
import { toNumber } from "utils";
import { useTopMediaListSearchParams } from "./util";

export const TopMediaList = () => {
  const [params, setParams] = useTopMediaListSearchParams();
  const { isLoading, error, data } = useTopMediaList(params);

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
      <TopMediaModal />
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
