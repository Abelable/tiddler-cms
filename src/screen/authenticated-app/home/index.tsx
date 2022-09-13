import styled from "@emotion/styled";

export const Home = () => {
  return (
    <Container>
      <Main></Main>
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
