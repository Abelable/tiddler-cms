import styled from "@emotion/styled";

import { useRestaurantOptions } from "service/restaurant";
import { useSetMealList } from "service/setMeal";
import { toNumber } from "utils";
import { useSetMealListSearchParams } from "./util";

import { SetMealModal } from "./components/set-meal-modal";
import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";
import { RejectModal } from "./components/reject-modal";

export const SetMealList = () => {
  const [params, setParams] = useSetMealListSearchParams();
  const { isLoading, error, data } = useSetMealList(params);
  const { data: restaurantOptions, error: restaurantOptionsError } =
    useRestaurantOptions();
  const statusOptions = [
    { text: "待审核", value: 0 },
    { text: "售卖中", value: 1 },
    { text: "未过审", value: 2 },
  ];

  return (
    <Container>
      <Main>
        <SearchPanel
          restaurantOptions={restaurantOptions || []}
          statusOptions={statusOptions}
          params={params}
          setParams={setParams}
        />
        <List
          restaurantOptions={restaurantOptions || []}
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
      <SetMealModal restaurantOptions={restaurantOptions || []} />
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
