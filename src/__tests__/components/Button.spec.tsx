import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import { Button } from "../../components/Button/Button";
import "@testing-library/jest-dom/extend-expect";

describe("Button suite test", () => {
  it("Should render the button", () => {
    const { getByText } = render(<Button onClick={() => {}}>Click me</Button>);

    expect(getByText("Click me")).toBeInTheDocument();
  });

  it("Should call the onClick function", () => {
    const onClick = jest.fn();
    const { getByText } = render(<Button onClick={onClick}>Click me</Button>);

    fireEvent.click(getByText("Click me"));

    expect(onClick).toHaveBeenCalled();
  });

  it("Should handle multiple clicks", () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Button onClick={handleClick}>Click me</Button>
    );

    const button = getByText("Click me");

    fireEvent.click(button);
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(2);
  });

  it("Should be disabled when disabled prop is passed", () => {
    const { getByText } = render(
      <Button onClick={() => {}} style={{ pointerEvents: "none" }} disabled>
        Disabled Button
      </Button>
    );

    const button = getByText("Disabled Button");
    expect(button).toBeDisabled();
  });
});
