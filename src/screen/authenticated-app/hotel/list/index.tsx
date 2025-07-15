import styled from "@emotion/styled";

import { useHotelCategoryOptions } from "service/hotelCategory";
import { useHotelList } from "service/hotel";
import { toNumber } from "utils";
import { useHotelListSearchParams } from "./util";

import { HotelModal } from "./components/hotel-modal";
import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";

export const HotelList = () => {
  const [params, setParams] = useHotelListSearchParams();
  const { isLoading, error, data } = useHotelList(params);
  const { data: hotelCategoryOptions, error: hotelOptionsError } =
    useHotelCategoryOptions();
  const gradeOptions = [
    { text: "经济酒店", value: 1 },
    { text: "舒适酒店", value: 2 },
    { text: "高档酒店", value: 3 },
    { text: "豪华酒店", value: 4 },
  ];

  return (
    <Container>
      <Main>
        <SearchPanel
          gradeOptions={gradeOptions}
          categoryOptions={hotelCategoryOptions || []}
          params={params}
          setParams={setParams}
        />
        <List
          gradeOptions={gradeOptions}
          categoryOptions={hotelCategoryOptions || []}
          params={params}
          setParams={setParams}
          error={error || hotelOptionsError}
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
      <HotelModal
        gradeOptions={gradeOptions}
        categoryOptions={hotelCategoryOptions || []}
      />
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
