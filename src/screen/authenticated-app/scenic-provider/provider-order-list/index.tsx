import styled from "@emotion/styled";
import { useProviderOrders } from "service/scenicProvider";
import { toNumber } from "utils";
import { useProviderOrdersSearchParams } from "./util";

import { List } from "./components/list";

export const ScenicProviderOrderList = () => {
  const [params, setParams] = useProviderOrdersSearchParams();
  const { isLoading, error, data } = useProviderOrders(params);

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
