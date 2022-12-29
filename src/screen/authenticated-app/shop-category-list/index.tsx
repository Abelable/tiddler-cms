import styled from "@emotion/styled";
import { useShopCategories } from "service/shopCategory";
import { toNumber } from "utils";
import { List } from "./components/list";
import { ShopCategoryModal } from "./components/shop-category-modal";
import { useShopCategoriesSearchParams } from "./util";

export const ShopCategoryList = () => {
  const [params, setParams] = useShopCategoriesSearchParams();
  const { isLoading, error, data } = useShopCategories(params);

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
      <ShopCategoryModal />
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
