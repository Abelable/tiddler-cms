import { GoodsModal } from "./components/goods-modal";
import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";

import styled from "@emotion/styled";
import { useGoodsOptions } from "service/goods";
import { useGiftTypeOptions } from "service/giftType";
import { useGiftGoodsList } from "service/giftGoods";
import { toNumber } from "utils";
import { useGiftGoodsListSearchParams } from "./util";

export const GiftGoodsList = () => {
  const { data: typeOptions = [], error: typeOptionsError } =
    useGiftTypeOptions();
  const { data: goodsOptions = [], error: goodsOptionsError } =
    useGoodsOptions();
  const [params, setParams] = useGiftGoodsListSearchParams();
  const { isLoading, error, data } = useGiftGoodsList(params);

  return (
    <Container>
      <Main>
        <SearchPanel
          typeOptions={typeOptions}
          goodsOptions={goodsOptions}
          params={params}
          setParams={setParams}
        />
        <List
          typeOptions={typeOptions}
          params={params}
          setParams={setParams}
          error={error || typeOptionsError || goodsOptionsError}
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
