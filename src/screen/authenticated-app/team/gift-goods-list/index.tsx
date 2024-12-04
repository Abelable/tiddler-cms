import { GoodsModal } from "./components/goods-modal";
import { List } from "./components/list";

import styled from "@emotion/styled";
import { useGiftGoodsList } from "service/giftGoods";
import { toNumber } from "utils";
import { useGiftGoodsListSearchParams } from "./util";

const typeOptions = [
  { text: "爱心助农", value: 1 },
  { text: "文旅周边", value: 2 },
];

export const GiftGoodsList = () => {
  const [params, setParams] = useGiftGoodsListSearchParams();
  const { isLoading, error, data } = useGiftGoodsList(params);

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
            showSizeChanger: true,
          }}
          bordered
        />
      </Main>
      <GoodsModal typeOptions={typeOptions} />
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
