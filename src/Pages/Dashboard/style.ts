import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 30px;
  height: 100vh;
  background-color: #fff;
  color: #000;
  width: 100%;

  @media (max-width: 768px) {
    min-height: 100vh;
  }
`;

export const Title = styled.h1`
  font-size: 48px;
  margin-bottom: 20px;
`;
