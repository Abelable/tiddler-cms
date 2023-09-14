import styled from "@emotion/styled";
import { useExpresses } from "service/express";
import { toNumber } from "utils";
import { List } from "./components/list";
import { ExpressModal } from "./components/express-modal";
import { useExpressesSearchParams } from "./util";

export const ExpressList = () => {
  const [params, setParams] = useExpressesSearchParams();
  const { isLoading, error, data } = useExpresses(params);

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
            current: toNumber(data?.page),
            pageSize: toNumber(data?.limit),
            total: toNumber(data?.total),
          }}
        />
      </Main>
      <ExpressModal />
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
