import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import FavouritesPage from '../pages/FavouritesPage';
import { createStore } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import rootReducer from '../reducers/index'; 
import "@testing-library/jest-dom"

jest.mock('axios', () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
  })),
}));

test('renders FavouritesPage without crashing', () => {
  const store = createStore(rootReducer);
  render(
    <Provider store={store}>
    <Router>
      <FavouritesPage />
    </Router>
    </Provider>
  );
});

test('renders Spinner when data is being fetched', () => {
  const store = createStore(rootReducer);
  render(
    <Provider store={store}>
    <Router>
      <FavouritesPage />
    </Router>
    </Provider>
  );
  const spinner = screen.getByRole('spinner');
  expect(spinner).toBeInTheDocument();
});

