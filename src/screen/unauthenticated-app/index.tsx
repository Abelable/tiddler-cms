import { useState } from "react";
import { LoginScreen } from "./login";
import { Card } from "antd";
import styled from "@emotion/styled";
import left from "assets/images/left.svg";
import right from "assets/images/right.svg";
import { ErrorBox } from "components/lib";

export const UnauthenticatedApp = () => {
  const [error, setError] = useState<Error | null>(null);

  return (
    <Container>
      <Header>小鱼儿后台管理系统</Header>
      <Background />
      <ShadowCard>
        <Title>请登录</Title>
        <ErrorBox error={error} />
        <LoginScreen onError={setError} />
      </ShadowCard>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
    calc(((100vw - 40rem) / 2) - 3.2rem), cover;
  background-image: url(${left}), url(${right});
`;

const Header = styled.header`
  padding: 5rem 0;
  font-size: 2.8rem;
  text-align: center;
  font-weight: 500;
`;

const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`;
