import React from "react";
import { render, screen, fireEvent,waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import CategoryHeader from "../components/CategoryHeader";
import "@testing-library/jest-dom";

jest.mock("../components/FlashcardDropdown", () => {
  return jest.fn(() => (
    <div data-testid="mock-flashcard-dropdown">Mock FlashcardDropdown</div>
  ));
});

describe("CategoryHeader", () => {
  test("renders without crashing", () => {
    render(
      <Router>
        <CategoryHeader isOpen={true} isMobile={true} />
      </Router>
    );
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  test("renders the correct number of navigation links", () => {
    render(
      <Router>
        <CategoryHeader isOpen={true} isMobile={true} />
      </Router>
    );
    const links = screen.getAllByRole("link");
    expect(links.length).toBe(7);
  });

  test("does not render the FlashcardDropdown component when isFlashOpen is false", () => {
    render(
      <Router>
        <CategoryHeader isOpen={true} isMobile={true} />
      </Router>
    );
    expect(
      screen.queryByTestId("mock-flashcard-dropdown")
    ).not.toBeInTheDocument();
  });
});
