import styled from "@emotion/styled";
import { useShops } from "service/shop";
import { useShopCategoryOptions } from "service/shopCategory";
import { toNumber } from "utils";
import { useShopsSearchParams } from "./util";

import { ShopModal } from "./components/shop-modal";
import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";

export const ShopList = () => {
  const [params, setParams] = useShopsSearchParams();
  const { isLoading, error, data } = useShops(params);
  const { data: shopCategoryOptions } = useShopCategoryOptions();

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
            current: toNumber(data?.page) || 1,
            pageSize: toNumber(data?.limit),
            total: toNumber(data?.total),
          }}
        />
      </Main>
      <ShopModal shopCategoryOptions={shopCategoryOptions || []} />
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
