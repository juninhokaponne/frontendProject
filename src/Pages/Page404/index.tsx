import { Link } from "react-router-dom";
import animation404 from "../../assets/lotties/Animation - 1727797555323.json";
import Lottie from "react-lottie";
import * as Styled from "./style";

export const Page404 = () => {
  return (
    <Styled.Container>
      <Styled.LottieContainer>
        <Styled.HeaderContente>
          <Styled.Title>Ops ... Página não encontrada :(</Styled.Title>
          <Styled.Title>
            <pre>
              Mas calma, basta{" "}
              <strong>clicar na imagem abaixo que te redirecionaremos</strong>{" "}
              para fazer o seu login ou cadastro.
            </pre>
          </Styled.Title>
        </Styled.HeaderContente>
        <Link to="/">
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: animation404,
              rendererSettings: {
                preserveAspectRatio: "xMidYMid slice",
              },
            }}
            isClickToPauseDisabled
            height={400}
            width={600}
          />
        </Link>
      </Styled.LottieContainer>
    </Styled.Container>
  );
};
