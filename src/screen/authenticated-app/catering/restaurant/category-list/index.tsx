import styled from "@emotion/styled";
import { useRestaurantCategories } from "service/restaurantCategory";
import { toNumber } from "utils";
import { List } from "./components/list";
import { RestaurantCategoryModal } from "./components/category-modal";
import { useRestaurantCategoriesSearchParams } from "./util";

export const RestaurantCategoryList = () => {
  const [params, setParams] = useRestaurantCategoriesSearchParams();
  const { isLoading, error, data } = useRestaurantCategories(params);

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
            current: toNumber(data?.page),
            pageSize: toNumber(data?.limit),
            total: toNumber(data?.total),
          }}
        />
      </Main>
      <RestaurantCategoryModal />
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
