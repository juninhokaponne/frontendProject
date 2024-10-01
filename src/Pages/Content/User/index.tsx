import {
  Button,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  ButtonGroup,
  Stack,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  FormControl,
  FormLabel,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import * as Styled from "./style";
import {
  fetchUsers,
  deleteUser,
  updateUser,
  fetchUserDetails,
} from "../../../redux/actions/userActions";
import { useDispatch } from "react-redux";

import { useToast } from "@chakra-ui/react";
import { showToast } from "../../../utils/toast";

interface User {
  id: number;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export const UsersContent: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [warnigModal, setWarningModal] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editedName, setEditedName] = useState(selectedUser?.name || "");
  const [editedEmail, setEditedEmail] = useState(selectedUser?.email || "");
  const [editedPassword, setEditedPassword] = useState("");
  const [userDetails, setUserDetails] = useState<User | null>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isDetailsOpen,
    onOpen: onDetailsOpen,
    onClose: onDetailsClose,
  } = useDisclosure();
  const toast = useToast();
  const dispatch = useDispatch();
  const idToast = "signup-toast";

  useEffect(() => {
    const fetchData = async () => {
      const response = await dispatch(fetchUsers() as any);
      setUsers(response);
    };

    fetchData();
  }, [dispatch, userDetails]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleEdit = (user: User) => {
    console.log("user -> ", user);
    setSelectedUser(user);
    setEditedName(user.name);
    setEditedEmail(user.email);
    onOpen();
  };

  const handleDelete = (userId: number) => {
    dispatch(deleteUser(userId) as any);
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));

    if (!toast.isActive(idToast)) {
      showToast(
        idToast,
        "Usuário deletado com sucesso.",
        "O usuário foi deletado com sucesso.",
        "success",
        toast
      );
    }
  };

  const handleSaveChanges = () => {
    if (selectedUser) {
      const updatedUser = {
        ...selectedUser,
        name: editedName,
        email: editedEmail,
        password: editedPassword,
      };

      dispatch(updateUser(String(selectedUser.id), updatedUser) as any);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === selectedUser.id ? updatedUser : user
        )
      );

      onClose();

      if (!toast.isActive(idToast)) {
        showToast(
          idToast,
          "Usuário editado com sucesso.",
          "O usuário foi editado com sucesso.",
          "success",
          toast
        );
      }
    }
  };

  const handleShowDetails = async (id: number) => {
    setLoading(true);
    try {
      const response = await dispatch(fetchUserDetails(String(id)) as any);
      setUserDetails(response);
    } catch (error) {
      console.error(error);
      if (!toast.isActive(idToast)) {
        showToast(
          idToast,
          "Erro ao buscar detalhes do usuário.",
          "Foi encontrado um erro ao buscar os detalhes do usuário.",
          "error",
          toast
        );
      }
    } finally {
      setLoading(false);
      onDetailsOpen();
    }
  };

  return (
    <Styled.Container>
      <Box overflowX="auto">
        <Table variant="simple">
          <Thead
            style={{
              backgroundColor: "#c3c3c3",
            }}
          >
            <Tr>
              <Th>ID</Th>
              <Th>Nome</Th>
              <Th>Email</Th>
              <Th>Data de Criação</Th>
              <Th>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentUsers.map((user) => (
              <Tr key={user.id}>
                <Td>{user.id}</Td>
                <Td>{user.name}</Td>
                <Td>{user.email}</Td>
                <Td>{new Date(user.createdAt).toLocaleDateString()}</Td>
                <Td>
                  <ButtonGroup spacing="2">
                    <Button
                      variant="solid"
                      colorScheme="blue"
                      onClick={() => handleEdit(user)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="solid"
                      colorScheme="green"
                      onClick={() => handleShowDetails(user.id)}
                    >
                      Detalhes
                    </Button>
                    <Button
                      variant="ghost"
                      colorScheme="red"
                      onClick={() => handleDelete(user.id)}
                    >
                      Deletar
                    </Button>
                  </ButtonGroup>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <Stack direction="row" spacing={4} mt={4} justify="center">
        {Array.from(
          { length: Math.ceil(users.length / usersPerPage) },
          (_, i) => (
            <Button
              key={i + 1}
              colorScheme={currentPage === i + 1 ? "blue" : "gray"}
              onClick={() => paginate(i + 1)}
            >
              {i + 1}
            </Button>
          )
        )}
      </Stack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Usuário</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Nome</FormLabel>
              <Input
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={editedEmail}
                onChange={(e) => setEditedEmail(e.target.value)}
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Senha</FormLabel>
              <Input
                type="password"
                value={editedPassword}
                onChange={(e) => setEditedPassword(e.target.value)}
                placeholder="Deixe em branco se não quiser alterar"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSaveChanges}>
              Salvar
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isDetailsOpen} onClose={onDetailsClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Detalhes do Usuário</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {loading ? (
              <p style={{ textAlign: "center" }}>
                Carregando detalhes do usuário...
              </p>
            ) : userDetails ? (
              <>
                <p>
                  <strong>ID:</strong> {userDetails.id}
                </p>
                <p>
                  <strong>Nome:</strong> {userDetails.name}
                </p>
                <p>
                  <strong>Email:</strong> {userDetails.email}
                </p>
                <p>
                  <strong>Data de Criação:</strong>{" "}
                  {new Date(userDetails.createdAt).toLocaleDateString()}
                </p>
                <p>
                  <strong>Data de Atualização:</strong>{" "}
                  {new Date(userDetails.updatedAt).toLocaleDateString()}
                </p>
              </>
            ) : (
              <p style={{ textAlign: "center" }}>Nenhum detalhe disponível.</p>
            )}
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={onDetailsClose}>
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Styled.Container>
  );
};
