import styled from "@emotion/styled";
import { useHotelRoomTypeList } from "service/hotelRoomType";
import { toNumber } from "utils";
import { List } from "./components/list";
import { HotelRoomTypeModal } from "./components/hotel-room-type-modal";
import { useHotelRoomTypeListSearchParams } from "./util";

export const HotelRoomTypeList = () => {
  const [params, setParams] = useHotelRoomTypeListSearchParams();
  const { isLoading, error, data } = useHotelRoomTypeList(params);

  return (
    <Container>
      <Main>
        <List
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
          bordered
        />
      </Main>
      <HotelRoomTypeModal hotelId={+(params.hotelId || 0)} />
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
