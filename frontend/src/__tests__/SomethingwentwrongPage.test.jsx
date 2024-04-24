import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import SomethingwentwrongPage from "../pages/SomethingwentwrongPage";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import rootReducer from '../reducers/index'; 

describe("SomethingwentwrongPage", () => {
  test("renders without crashing", () => {
    render(
        <Provider store={createStore(rootReducer)}>
      <MemoryRouter>
        <SomethingwentwrongPage />
      </MemoryRouter>
      </Provider>
    );

    // Check if the error image is in the document
    const errorImage = screen.getByAltText("Something Went Wrong");
    expect(errorImage).toBeInTheDocument();

    // Check if the "Sorry, something went wrong." text is in the document
    const errorMessage = screen.getByText("Sorry, something went wrong.");
    expect(errorMessage).toBeInTheDocument();

    // Check if the "Go Home" button is in the document
    const goHomeButton = screen.getByText("Go Home");
    expect(goHomeButton).toBeInTheDocument();
  });
});