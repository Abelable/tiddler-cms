import styled from "@emotion/styled";

import { useTicketCategoryOptions } from "service/ticketCategory";
import { useShopCategoryOptions } from "service/shopCategory";
import { useTicketList } from "service/ticket";
import { toNumber } from "utils";
import { useTicketListSearchParams } from "./util";

import { TicketModal } from "./components/ticket-modal";
import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";
import { RejectModal } from "./components/reject-modal";

export const TicketList = () => {
  const [params, setParams] = useTicketListSearchParams();
  const { isLoading, error, data } = useTicketList(params);
  const { data: ticketCategoryOptions, error: ticketOptionsError } =
    useTicketCategoryOptions();
  const { data: shopCategoryOptions } = useShopCategoryOptions();
  const statusOptions = [
    { text: "待审核", value: 0 },
    { text: "售卖中", value: 1 },
    { text: "未过审", value: 2 },
  ];

  return (
    <Container>
      <Main>
        <SearchPanel
          categoryOptions={ticketCategoryOptions || []}
          statusOptions={statusOptions}
          params={params}
          setParams={setParams}
        />
        <List
          categoryOptions={ticketCategoryOptions || []}
          statusOptions={statusOptions}
          params={params}
          setParams={setParams}
          error={error || ticketOptionsError}
          loading={isLoading}
          dataSource={data?.list}
          pagination={{
            current: toNumber(data?.page),
            pageSize: toNumber(data?.limit),
            total: toNumber(data?.total),
          }}
        />
      </Main>
      <TicketModal
        ticketCategoryOptions={ticketCategoryOptions || []}
        shopCategoryOptions={shopCategoryOptions || []}
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
