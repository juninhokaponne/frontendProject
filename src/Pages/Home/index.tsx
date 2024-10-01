import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaGoogle, FaApple, FaFacebook } from "react-icons/fa";
import * as Styled from "./style";
import { useToast } from "@chakra-ui/react";
import { showToast } from "../../utils/toast";
import { Services } from "../../services";

export const Home = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLogged, setIsLogged] = useState(false);
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const id = "signup-toast";

  const onSubmit = async (data: any) => {
    try {
      if (isLogin) {
        const response = await Services.login(data);

        if (response.status === 401) {
          throw new Error("Erro ao realizar a operação.");
        }

        localStorage.setItem("token", response.token.token);
        localStorage.setItem("user", JSON.stringify(response.token.user));

        window.location.href = "/dashboard";
      } else {
        await Services.register(data).then((response) => {
          if (response.status === 401) {
            throw new Error("Erro ao realizar a operação.");
          }

          if (!isLogged) localStorage.setItem("token", response.token);
        });

        if (!toast.isActive(id)) {
          showToast(
            id,
            "Conta criada com sucesso.",
            "Agora você pode realizar seu login e acessar todas as funcionalidades do sistema 🤩.",
            "success",
            toast
          );
        }
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message;

      if (errorMessage == "Invalid email or password") {
        if (!toast.isActive(id)) {
          showToast(
            id,
            "Erro ao realizar a operação.",
            "Email ou senha inválidos.",
            "error",
            toast
          );
        }
      } else if (!toast.isActive(id)) {
        showToast(
          id,
          "Erro ao realizar a operação.",
          "Por favor tente novamente mais tarde.",
          "error",
          toast
        );
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLogged(true);
    }
  });

  return (
    <Styled.Container>
      <Styled.SignupContainer>
        <Styled.Title>{isLogin ? "Bem-vindo" : "Cadastre-se"}</Styled.Title>
        <Styled.Text>
          {isLogin
            ? "Por favor informe seus dados para fazer login."
            : "Por favor informe seus dados para se cadastrar."}
        </Styled.Text>

        <Styled.Header>
          <Styled.SocialMedia>
            <a href="#">
              <Styled.SocialMediaIcon>
                <FaGoogle size={20} />
              </Styled.SocialMediaIcon>
            </a>
          </Styled.SocialMedia>
          <Styled.SocialMedia>
            <a href="#">
              <Styled.SocialMediaIcon>
                <FaApple size={20} />
              </Styled.SocialMediaIcon>
            </a>
          </Styled.SocialMedia>
          <Styled.SocialMedia>
            <a href="#">
              <Styled.SocialMediaIcon>
                <FaFacebook size={20} />
              </Styled.SocialMediaIcon>
            </a>
          </Styled.SocialMedia>
        </Styled.Header>

        <Styled.Text>ou</Styled.Text>

        <Styled.Form onSubmit={handleSubmit(onSubmit)}>
          {isLogin && (
            <>
              <Styled.label>Email</Styled.label>
              <Styled.Input
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: "Campo email é obrigatório",
                })}
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
                {...register("password", {
                  required: "Campo senha é obrigatória",
                })}
              />
              {errors.password && (
                <Styled.TextError>
                  {String(errors.password?.message)}
                </Styled.TextError>
              )}
              <Styled.Button type="submit">Login</Styled.Button>
            </>
          )}

          {!isLogin && (
            <>
              <Styled.label>Nome</Styled.label>
              <Styled.Input
                type="text"
                placeholder="Nome"
                {...register("name", { required: "Campo nome é obrigatório" })}
              />
              {errors.name && (
                <Styled.TextError>
                  {String(errors.name?.message)}
                </Styled.TextError>
              )}

              <Styled.label>Email</Styled.label>
              <Styled.Input
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: "Campo email é obrigatório",
                })}
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
                {...register("password", {
                  required: "Campo senha é obrigatória",
                })}
              />
              {errors.password && (
                <Styled.TextError>
                  {String(errors.password?.message)}
                </Styled.TextError>
              )}

              <Styled.Button type="submit">Cadastrar</Styled.Button>
            </>
          )}
        </Styled.Form>

        <Styled.Text>
          {isLogin ? (
            <>
              Não possui uma conta?{" "}
              <a href="#" onClick={() => setIsLogin(false)}>
                <b>Cadastre-se</b>
              </a>
            </>
          ) : (
            <>
              Já possui uma conta?{" "}
              <a href="#" onClick={() => setIsLogin(true)}>
                <b>Faça login</b>
              </a>
            </>
          )}
        </Styled.Text>
      </Styled.SignupContainer>
    </Styled.Container>
  );
};
