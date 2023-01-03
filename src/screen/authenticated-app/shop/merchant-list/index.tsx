import styled from "@emotion/styled";
import { useMerchants } from "service/merchant";
import { useShopCategoryOptions } from "service/shopCategory";
import { toNumber } from "utils";
import { useMerchantsSearchParams } from "./util";

import { MerchantModal } from "./components/merchant-modal";
import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";

export const MerchantList = () => {
  const [params, setParams] = useMerchantsSearchParams();
  const { isLoading, error, data } = useMerchants(params);
  const { data: shopCategoryOptions } = useShopCategoryOptions();

  return (
    <Container>
      <Main>
        <SearchPanel params={params} setParams={setParams} />
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
      <MerchantModal shopCategoryOptions={shopCategoryOptions || []} />
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
