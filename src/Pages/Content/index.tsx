import React, { useState } from "react";
import * as Styled from "./style";
import Lottie from "react-lottie";
import animationData from "../../assets/lotties/building.json";
import { UsersContent } from "./User";
import MovieList from "./Movies";

interface ContentProps {
  activeContent: string;
}

export const Content = ({ activeContent }: ContentProps) => {
  const renderContent = () => {
    switch (activeContent) {
      case "users":
        return <UsersContent />;
      case "movies":
        return <MovieList />;
      case "profile":
        return <ProfileContent />;
      default:
        return <UsersContent />;
    }
  };

  return <Styled.Content>{renderContent()}</Styled.Content>;
};

const ProfileContent = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <h1
        style={{
          marginTop: "10px",
          marginBottom: "10px",
          fontSize: "2rem",
        }}
      >
        Página
      </h1>
      <p
        style={{
          fontSize: "1.5rem",
          marginBottom: "10px",
        }}
      >
        Em construção...
      </p>
      <Lottie
        options={{ loop: true, autoplay: true, animationData }}
        isClickToPauseDisabled
      />
    </div>
  );
};
