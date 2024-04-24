import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import rootReducer from '../reducers/index'; 
describe("ErrorPage", () => {
  test("renders without crashing", () => {
    render(
        <Provider store={createStore(rootReducer)}>
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>
        </Provider>
    );

    // Check if the error image is in the document
    const errorImage = screen.getByAltText("Error Encountered");
    expect(errorImage).toBeInTheDocument();

    // Check if the "Page Not Found" text is in the document
    const pageNotFoundText = screen.getByText("Page Not Found");
    expect(pageNotFoundText).toBeInTheDocument();

    // Check if the "Go Home" button is in the document
    const goHomeButton = screen.getByText("Go Home");
    expect(goHomeButton).toBeInTheDocument();
  });
});