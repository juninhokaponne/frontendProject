import React from "react";
import * as Styled from "./style";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { SimpleGrid } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/actions/userActions";
import { showToast } from "../../utils/toast";

interface ModalProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalProfile: React.FC<ModalProfileProps> = ({
  isOpen,
  onClose,
}) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const userData = localStorage.getItem("user");
  const idToast = "update-user-toast";
  const { name, email, id } = JSON.parse(userData || "{}");

  const onSubmit = (data: any) => {
    try {
      const response = dispatch(
        updateUser(id, { profileDetails: data }) as any
      );

      console.log("response", response);

      if (response && response.statusCode == 200 && !toast.isActive(idToast)) {
        showToast(
          idToast,
          "Informações atualizadas com sucesso.",
          "Seu perfil foi atualizado com sucesso.",
          "success",
          toast
        );
      }

      onClose();
      throw new Error("Erro ao atualizar informações.");
    } catch (error) {
      if (!toast.isActive(idToast)) {
        showToast(
          idToast,
          "Erro ao atualizar informações.",
          "Por favor tente novamente mais tarde.",
          "error",
          toast
        );
      }
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handleCepChange = async (cep: string) => {
    const formattedCep = cep.replace(/\D/g, "");
    if (formattedCep.length === 8) {
      try {
        const response = await fetch(
          `https://viacep.com.br/ws/${formattedCep}/json/`
        );
        const data = await response.json();
        if (!data.erro) {
          setValue("address", data.logradouro);
          setValue("city", data.localidade);
          setValue("state", data.uf);
        }
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar informações</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Styled.GenericText>
            Edite suas informações pessoais para deixar seu perfil completo.
          </Styled.GenericText>

          <Styled.Form onSubmit={handleSubmit(onSubmit)}>
            <>
              <Styled.label>Nome</Styled.label>
              <Styled.Input
                type="text"
                placeholder="Nome"
                defaultValue={name}
                {...register("name")}
              />

              <Styled.label>Email</Styled.label>
              <Styled.Input
                type="email"
                placeholder="Email"
                defaultValue={email}
                {...register("email")}
              />
              {errors.email && (
                <Styled.TextError>
                  {String(errors.email?.message)}
                </Styled.TextError>
              )}

              <Styled.label>Senha</Styled.label>
              <Styled.Input
                type="password"
                placeholder="Senha"
                {...register("password")}
              />

              <SimpleGrid columns={2} spacing={4}>
                <Styled.label>CEP</Styled.label>
                <Styled.label>Endereço</Styled.label>
                <Styled.Input
                  type="text"
                  placeholder="CEP"
                  {...register("zip", {
                    onChange: (e) => handleCepChange(e.target.value),
                  })}
                />
                <Styled.Input
                  type="text"
                  placeholder="Endereço"
                  {...register("address")}
                />

                <Styled.label>Cidade</Styled.label>
                <Styled.label>Estado</Styled.label>
                <Styled.Input
                  type="text"
                  placeholder="Cidade"
                  {...register("city")}
                />
                <Styled.Input
                  type="text"
                  placeholder="Estado"
                  {...register("state")}
                />

                <Styled.label>País</Styled.label>
                <Styled.label>Bio</Styled.label>
                <Styled.Input
                  type="text"
                  placeholder="País"
                  {...register("country")}
                />
                <Styled.Input
                  type="text"
                  placeholder="Bio"
                  {...register("bio")}
                />
              </SimpleGrid>
            </>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button type="submit">Save</Button>
            </ModalFooter>
          </Styled.Form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
