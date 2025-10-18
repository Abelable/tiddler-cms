import { TaskModal } from "./components/task-modal";
import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";

import styled from "@emotion/styled";
import { useTaskList } from "service/task";
import { toNumber } from "utils";
import { useTaskListSearchParams } from "./util";
import { useScenicOptions } from "service/scenic";
import { useHotelOptions } from "service/hotel";
import { useRestaurantOptions } from "service/restaurant";

const statusOptions = [
  { text: "进行中", value: 1 },
  { text: "被领取", value: 2 },
  { text: "已完成", value: 3 },
  { text: "已下架", value: 4 },
];
const merchantTypeOptions = [
  { text: "景点", value: 1 },
  { text: "酒店", value: 2 },
  { text: "餐饮", value: 3 },
  { text: "商品", value: 4 },
];

export const TaskList = () => {
  const { data: scenicOptions = [], error: scenicOptionsError } =
    useScenicOptions();
  const { data: hotelOptions = [], error: hotelOptionsError } =
    useHotelOptions();
  const { data: restaurantOptions = [], error: restaurantOptionsError } =
    useRestaurantOptions();
  const [params, setParams] = useTaskListSearchParams();
  const { isLoading, error, data } = useTaskList(params);

  return (
    <Container>
      <Main>
        <SearchPanel
          statusOptions={statusOptions}
          merchantTypeOptions={merchantTypeOptions}
          params={params}
          setParams={setParams}
        />
        <List
          statusOptions={statusOptions}
          merchantTypeOptions={merchantTypeOptions}
          params={params}
          setParams={setParams}
          error={
            scenicOptionsError ||
            hotelOptionsError ||
            restaurantOptionsError ||
            error
          }
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
      <TaskModal
        merchantTypeOptions={merchantTypeOptions}
        scenicOptions={scenicOptions}
        hotelOptions={hotelOptions}
        restaurantOptions={restaurantOptions}
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
