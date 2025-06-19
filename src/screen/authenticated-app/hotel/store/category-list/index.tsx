import styled from "@emotion/styled";
import { useHotelCategories } from "service/hotelCategory";
import { toNumber } from "utils";
import { List } from "./components/list";
import { HotelCategoryModal } from "./components/hotel-category-modal";
import { useHotelCategoriesSearchParams } from "./util";

export const HotelCategoryList = () => {
  const [params, setParams] = useHotelCategoriesSearchParams();
  const { isLoading, error, data } = useHotelCategories(params);

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
      <HotelCategoryModal />
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
