import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Spinner from "../components/Spinner";

describe("Spinner", () => {
  test("renders without crashing", () => {
    render(<Spinner />);

    // Check if the spinner is in the document
    const spinner = screen.getByRole("spinner");
    expect(spinner).toBeInTheDocument();
  });
});
