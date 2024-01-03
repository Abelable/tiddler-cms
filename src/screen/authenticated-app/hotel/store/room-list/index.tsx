import styled from "@emotion/styled";

import { useRoomList } from "service/hotelRoom";
import { toNumber } from "utils";
import { useRoomListSearchParams } from "./util";

import { RoomModal } from "./components/room-modal";
import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";
import { RejectModal } from "./components/reject-modal";

export const HotelRoomList = () => {
  const [params, setParams] = useRoomListSearchParams();
  const { isLoading, error, data } = useRoomList(params);
  const statusOptions = [
    { text: "待审核", value: 0 },
    { text: "售卖中", value: 1 },
    { text: "未过审", value: 2 },
  ];

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
            current: toNumber(data?.page) || 1,
            pageSize: toNumber(data?.limit),
            total: toNumber(data?.total),
          }}
        />
      </Main>
      <RoomModal />
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
