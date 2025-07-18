import styled from "@emotion/styled";
import { useShopRestaurantList } from "service/shopRestaurant";
import { toNumber } from "utils";
import { useShopRestaurantListSearchParams } from "./util";

import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";
import { RejectModal } from "./components/reject-modal";

const statusOptions = [
  { text: "待审核", value: 0, color: "#87d068" },
  { text: "审核通过", value: 1, color: "#296BEF" },
  { text: "已驳回", value: 2, color: "#f50" },
];

export const ShopRestaurantList = () => {
  const [params, setParams] = useShopRestaurantListSearchParams();
  const { isLoading, error, data } = useShopRestaurantList(params);

  return (
    <Container>
      <Main>
        <SearchPanel
          statusOptions={statusOptions}
          params={params}
          setParams={setParams}
        />
        <List
          statusOptions={statusOptions}
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
