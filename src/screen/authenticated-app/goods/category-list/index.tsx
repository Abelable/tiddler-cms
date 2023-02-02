import styled from "@emotion/styled";
import { useGoodsCategories } from "service/goodsCategory";
import { toNumber } from "utils";
import { List } from "./components/list";
import { GoodsCategoryModal } from "./components/goods-category-modal";
import { useGoodsCategoriesSearchParams } from "./util";

export const GoodsCategoryList = () => {
  const [params, setParams] = useGoodsCategoriesSearchParams();
  const { isLoading, error, data } = useGoodsCategories(params);

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
      <GoodsCategoryModal />
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
