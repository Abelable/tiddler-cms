import styled from "@emotion/styled";

import { useScenicOptions } from "service/scenic";
import { useTicketList } from "service/scenicTicket";
import { toNumber } from "utils";
import { useTicketListSearchParams } from "./util";

import { TicketModal } from "./components/ticket-modal";
import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";
import { RejectModal } from "./components/reject-modal";

export const ScenicTicketList = () => {
  const [params, setParams] = useTicketListSearchParams();
  const { isLoading, error, data } = useTicketList(params);
  const { data: scenicOptions, error: scenicOptionsError } = useScenicOptions();
  const typeOptions = [
    { text: "单景区门票", value: 1 },
    { text: "多景区联票", value: 2 },
  ];
  const statusOptions = [
    { text: "待审核", value: 0 },
    { text: "售卖中", value: 1 },
    { text: "未过审", value: 2 },
  ];

  return (
    <Container>
      <Main>
        <SearchPanel
          typeOptions={typeOptions}
          scenicOptions={scenicOptions || []}
          statusOptions={statusOptions}
          params={params}
          setParams={setParams}
        />
        <List
          typeOptions={typeOptions}
          scenicOptions={scenicOptions || []}
          statusOptions={statusOptions}
          params={params}
          setParams={setParams}
          error={error || scenicOptionsError}
          loading={isLoading}
          dataSource={data?.list}
          pagination={{
            current: toNumber(data?.page) || 1,
            pageSize: toNumber(data?.limit),
            total: toNumber(data?.total),
          }}
        />
      </Main>
      <TicketModal
        typeOptions={typeOptions}
        scenicOptions={scenicOptions || []}
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
