import styled from "@emotion/styled";

import { useRestaurantCategoryOptions } from "service/restaurantCategory";
import { useRestaurantList } from "service/restaurant";
import { toNumber } from "utils";
import { useRestaurantListSearchParams } from "./util";

import { RestaurantModal } from "./components/restaurant-modal";
import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";

export const RestaurantList = () => {
  const [params, setParams] = useRestaurantListSearchParams();
  const { isLoading, error, data } = useRestaurantList(params);
  const { data: restaurantCategoryOptions, error: restaurantOptionsError } =
    useRestaurantCategoryOptions();

  return (
    <Container>
      <Main>
        <SearchPanel
          categoryOptions={restaurantCategoryOptions || []}
          params={params}
          setParams={setParams}
        />
        <List
          categoryOptions={restaurantCategoryOptions || []}
          params={params}
          setParams={setParams}
          error={error || restaurantOptionsError}
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
      <RestaurantModal categoryOptions={restaurantCategoryOptions || []} />
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
