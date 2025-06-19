import styled from "@emotion/styled";
import { useScenicCategories } from "service/scenicCategory";
import { toNumber } from "utils";
import { List } from "./components/list";
import { ScenicCategoryModal } from "./components/scenic-category-modal";
import { useScenicCategoriesSearchParams } from "./util";

export const ScenicCategoryList = () => {
  const [params, setParams] = useScenicCategoriesSearchParams();
  const { isLoading, error, data } = useScenicCategories(params);

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
      <ScenicCategoryModal />
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
