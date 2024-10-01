import React, { ReactElement } from "react";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  style,
  disabled,
}): ReactElement => {
  return (
    <button onClick={onClick} style={style} disabled={disabled}>
      {children}
    </button>
  );
};
