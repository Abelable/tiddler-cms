import styled from "@emotion/styled";
import { useShopCategories } from "service/shopCategory";
import { toNumber } from "utils";
import { List } from "./components/list";
import { ShopCategoryModal } from "./components/shop-category-modal";
import { useShopCategoriesSearchParams } from "./util";

const merchantTypeOptions = [
  { label: "个人", value: 1 },
  { label: "企业", value: 2 },
];

export const ShopCategoryList = () => {
  const [params, setParams] = useShopCategoriesSearchParams();
  const { isLoading, error, data } = useShopCategories(params);

  return (
    <Container>
      <Main>
        <List
          merchantTypeOptions={merchantTypeOptions}
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
      <ShopCategoryModal merchantTypeOptions={merchantTypeOptions} />
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
