import styled from "@emotion/styled";
import { useShops } from "service/scenicShop";
import { toNumber } from "utils";
import { useShopsSearchParams } from "./util";

import { ShopModal } from "./components/shop-modal";
import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";

export const HotelShopList = () => {
  const shopTypeOptions = [
    { text: "酒店官方", value: 1 },
    { text: "专营店", value: 2 },
    { text: "平台自营", value: 3 },
  ];
  const [params, setParams] = useShopsSearchParams();
  const { isLoading, error, data } = useShops(params);

  return (
    <Container>
      <Main>
        <SearchPanel params={params} setParams={setParams} />
        <List
          shopTypeOptions={shopTypeOptions}
          params={params}
          setParams={setParams}
          error={error}
          loading={isLoading}
          dataSource={data?.list}
          pagination={{
            current: toNumber(data?.page) || 1 || 1,
            pageSize: toNumber(data?.limit),
            total: toNumber(data?.total),
          }}
          bordered
        />
      </Main>
      <ShopModal shopTypeOptions={shopTypeOptions} />
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
