import styled from "@emotion/styled";
import { useRoles } from "service/role";
import { toNumber, useDebounce } from "utils";
import { List } from "./components/list";
import { useRolesSearchParams } from "./util";

export const RoleList = () => {
  const [params, setParams] = useRolesSearchParams();
  const { isLoading, error, data } = useRoles(useDebounce(params, 200));

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
