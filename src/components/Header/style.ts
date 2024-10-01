import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  color: #000;
  width: 100%;

  @media (max-width: 768px) {
    min-height: 100vh;
  }
`;

export const Header = styled.div`
  padding: 10px 0px;
  cursor: pointer;
  position: relative;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(8px);
  }

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 0 auto;
  }

  p {
    display: block;
    margin-top: 10px;
    text-align: center;
    color: "#222222";
    font-weight: bold;
  }
`;
