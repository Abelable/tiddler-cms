import styled from "@emotion/styled";
import { toNumber } from "utils";
import { useGoodsCategoriesSearchParams } from "./util";
import { useShopCategoryOptions } from "service/shopCategory";
import { useGoodsCategories } from "service/goodsCategory";

import { SearchPanel } from "./components/search-panel";
import { List } from "./components/list";
import { GoodsCategoryModal } from "./components/goods-category-modal";

export const GoodsCategoryList = () => {
  const { data: shopCategoryOptions } = useShopCategoryOptions();
  const [params, setParams] = useGoodsCategoriesSearchParams();
  const { isLoading, error, data } = useGoodsCategories(params);

  return (
    <Container>
      <Main>
        <SearchPanel
          shopCategoryOptions={shopCategoryOptions || []}
          params={params}
          setParams={setParams}
        />
        <List
          shopCategoryOptions={shopCategoryOptions || []}
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
      <GoodsCategoryModal />
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
