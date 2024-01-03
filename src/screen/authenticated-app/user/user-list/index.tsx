import styled from "@emotion/styled";
import { useUsers } from "service/user";
import { toNumber } from "utils";
import { useUsersSearchParams } from "./util";
import { UserModal } from "./components/user-modal";
import { List } from "./components/list";
import { SearchPanel } from "./components/search-panel";

export const UserList = () => {
  const [params, setParams] = useUsersSearchParams();
  const { isLoading, error, data } = useUsers(params);

  return (
    <Container>
      <Main>
        <SearchPanel params={params} setParams={setParams} />
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
        />
      </Main>
      <UserModal />
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
