import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #121212;
  color: #fff;

  @media (max-width: 768px) {
    min-height: 100vh;
  }
`;

export const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #333;
  max-width: 500px;
  width: 100%;
  padding: 40px;
  border-radius: 10px;

  @media (max-width: 768px) {
    height: 100%;
    border-radius: 0px;
    padding: 20px;
    justify-content: space-around;
  }
`;

export const Text = styled.p`
  font-size: 16px;
  color: #c1c1c1;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 0px;
  }
`;

export const TextError = styled.p`
  font-size: 16px;
  color: #ff0000;
  margin-top: -10px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  gap: 20px;
`;

export const Title = styled.h1`
  font-size: 24px;
`;

export const SocialMedia = styled.div`
  align-items: center;
  margin-bottom: 10px;
`;

export const SocialMediaIcon = styled.div`
  background-color: #444;
  width: 100px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;

  &:hover {
    background-color: #555;
  }
`;

export const SocialMediaText = styled.p`
  margin: 0;
`;

export const divider = styled.hr`
  background-color: #fff;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  width: 100%;

  @media (max-width: 768px) {
    gap: 20px;
  }
`;

export const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: #444;
  color: #fff;
  width: 100%;
  outline: none;

  &::placeholder {
    color: #c1c1c1;
    font-weight: 100;
  }

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

export const label = styled.label`
  font-size: 14px;
  color: #c1c1c1;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

export const Button = styled.button`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #222;
  background-color: #111;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #222;
  }

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;
