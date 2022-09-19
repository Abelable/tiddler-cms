import styled from "@emotion/styled";

export const RoleList = () => {
  return (
    <Container>
      <Main>角色管理</Main>
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
