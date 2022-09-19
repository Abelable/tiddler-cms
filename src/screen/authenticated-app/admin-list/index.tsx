import styled from "@emotion/styled";

export const AdminList = () => {
  return (
    <Container>
      <Main>管理员列表</Main>
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
