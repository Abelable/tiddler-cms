import { PrizeModal } from "./components/prize-modal";
import { List } from "./components/list";

import styled from "@emotion/styled";
import { usePrizeList } from "service/new-year/prize";
import { toNumber } from "utils";
import { usePrizeListSearchParams } from "./util";

const typeOptions = [
  { text: "福气值", value: 1 },
  { text: "优惠券", value: 2 },
  { text: "商品", value: 3 },
];

export const NewYearPrizeList = () => {
  const [params, setParams] = usePrizeListSearchParams();
  const { isLoading, error, data } = usePrizeList(params);

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
      <PrizeModal typeOptions={typeOptions} />
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
