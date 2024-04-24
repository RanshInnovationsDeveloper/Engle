import React from 'react';
import { render, screen } from '@testing-library/react';
import FavouritesCategoryPage from '../pages/FavouritesCategoryPage';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import rootReducer from '../reducers/index'; 

test('renders FavouritesCategoryPage without crashing', () => {
  render(
  <Provider store={createStore(rootReducer)}>
  <Router>
  <FavouritesCategoryPage />
  </Router>
  </Provider>);
});

test('renders correct number of favourite items', () => {
  render(
    <Provider store={createStore(rootReducer)}>
    <Router>
    <FavouritesCategoryPage />
    </Router>
    </Provider>);
  const items = screen.getAllByRole('listitem');
  expect(items).toHaveLength(19);
});