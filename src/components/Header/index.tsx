import React from "react";
import * as Styled from "./style";
import { useDisclosure } from "@chakra-ui/react";
import { ModalProfile } from "../Modal";

interface HeaderProps {
  username: string;
  email: string;
}

export const Header: React.FC<HeaderProps> = ({ username }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Styled.Container>
      <Styled.Header>
        <div onClick={onOpen}>
          <img src="https://picsum.photos/200" alt="profile" />
          <p data-testeid="text">{username}</p>
        </div>
      </Styled.Header>

      <ModalProfile isOpen={isOpen} onClose={onClose} />
    </Styled.Container>
  );
};
