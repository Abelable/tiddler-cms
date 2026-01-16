import { GoodsModal } from "./components/goods-modal";
import { List } from "./components/list";

import styled from "@emotion/styled";
import { useNewYearGoodsList } from "service/new-year/goods";
import { toNumber } from "utils";
import { useNewYearGoodsListSearchParams } from "./util";

export const NewYearGoodsList = () => {
  const [params, setParams] = useNewYearGoodsListSearchParams();
  const { isLoading, error, data } = useNewYearGoodsList(params);

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
            showSizeChanger: true,
          }}
          bordered
        />
      </Main>
      <GoodsModal />
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
