import styled from "@emotion/styled";

import { useRestaurantCategoryOptions } from "service/restaurantCategory";
import { useRestaurantList } from "service/restaurant";
import { toNumber } from "utils";
import { useRestaurantListSearchParams } from "./util";

import { RestaurantModal } from "./components/restaurant-modal";
import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";
import { RejectModal } from "./components/reject-modal";

export const RestaurantList = () => {
  const [params, setParams] = useRestaurantListSearchParams();
  const { isLoading, error, data } = useRestaurantList(params);
  const { data: restaurantCategoryOptions, error: restaurantOptionsError } =
    useRestaurantCategoryOptions();
  const statusOptions = [
    { text: "待审核", value: 0 },
    { text: "开放中", value: 1 },
    { text: "未过审", value: 2 },
  ];

  return (
    <Container>
      <Main>
        <SearchPanel
          categoryOptions={restaurantCategoryOptions || []}
          statusOptions={statusOptions}
          params={params}
          setParams={setParams}
        />
        <List
          categoryOptions={restaurantCategoryOptions || []}
          statusOptions={statusOptions}
          params={params}
          setParams={setParams}
          error={error || restaurantOptionsError}
          loading={isLoading}
          dataSource={data?.list}
          pagination={{
            current: toNumber(data?.page),
            pageSize: toNumber(data?.limit),
            total: toNumber(data?.total),
          }}
        />
      </Main>
      <RestaurantModal categoryOptions={restaurantCategoryOptions || []} />
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
