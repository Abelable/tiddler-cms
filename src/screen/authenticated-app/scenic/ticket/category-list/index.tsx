import styled from "@emotion/styled";
import { useScenicTicketCategories } from "service/scenicTicketCategory";
import { toNumber } from "utils";
import { List } from "./components/list";
import { ScenicTicketCategoryModal } from "./components/category-modal";
import { useScenicTicketCategoriesSearchParams } from "./util";

export const ScenicTicketCategoryList = () => {
  const [params, setParams] = useScenicTicketCategoriesSearchParams();
  const { isLoading, error, data } = useScenicTicketCategories(params);

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
      <ScenicTicketCategoryModal />
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
