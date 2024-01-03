import styled from "@emotion/styled";

import { useGoodsCategoryOptions } from "service/goodsCategory";
import { useShopCategoryOptions } from "service/shopCategory";
import { useGoodsList } from "service/goods";
import { toNumber } from "utils";
import { useGoodsListSearchParams } from "./util";

import { GoodsModal } from "./components/goods-modal";
import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";
import { RejectModal } from "./components/reject-modal";

export const GoodsList = () => {
  const [params, setParams] = useGoodsListSearchParams();
  const { isLoading, error, data } = useGoodsList(params);
  const { data: goodsCategoryOptions, error: goodsCategoryOptionsError } =
    useGoodsCategoryOptions();
  const { data: shopCategoryOptions, error: shopCategoryOptionsError } =
    useShopCategoryOptions();
  const statusOptions = [
    { text: "待审核", value: 0 },
    { text: "售卖中", value: 1 },
    { text: "未过审", value: 2 },
  ];

  return (
    <Container>
      <Main>
        <SearchPanel
          shopCategoryOptions={shopCategoryOptions || []}
          categoryOptions={goodsCategoryOptions || []}
          statusOptions={statusOptions}
          params={params}
          setParams={setParams}
        />
        <List
          shopCategoryOptions={shopCategoryOptions || []}
          categoryOptions={goodsCategoryOptions || []}
          statusOptions={statusOptions}
          params={params}
          setParams={setParams}
          error={error || goodsCategoryOptionsError || shopCategoryOptionsError}
          loading={isLoading}
          dataSource={data?.list}
          pagination={{
            current: toNumber(data?.page) || 1,
            pageSize: toNumber(data?.limit),
            total: toNumber(data?.total),
          }}
        />
      </Main>
      <GoodsModal
        shopCategoryOptions={shopCategoryOptions || []}
        goodsCategoryOptions={goodsCategoryOptions || []}
      />
      <RejectModal />
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
