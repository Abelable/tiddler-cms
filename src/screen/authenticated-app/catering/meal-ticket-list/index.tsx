import styled from "@emotion/styled";

import { useRestaurantOptions } from "service/restaurant";
import { useTicketList } from "service/mealTicket";
import { toNumber } from "utils";
import { useTicketListSearchParams } from "./util";

import { TicketModal } from "./components/ticket-modal";
import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";
import { RejectModal } from "./components/reject-modal";

export const MealTicketList = () => {
  const [params, setParams] = useTicketListSearchParams();
  const { isLoading, error, data } = useTicketList(params);
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
      <TicketModal restaurantOptions={restaurantOptions || []} />
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
