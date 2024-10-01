import styled from "styled-components";

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
  background-color: #c3c3c3;
  color: #000;
  width: 100%;
  outline: none;

  &::placeholder {
    color: #222222;
    font-weight: 100;
  }

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

export const GenericText = styled.p`
  font-size: 16px;
  color: #222222;
  margin-bottom: 10px;
  text-align: center;
`;

export const label = styled.label`
  font-size: 14px;
  color: #000;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

export const TextError = styled.p`
  font-size: 16px;
  color: #ff0000;
  margin-top: -10px;
`;
