import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import MynotesPage from '../pages/MynotesPage';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import rootReducer from '../reducers/index'; 
jest.mock('axios', () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
  })),
}));

describe('MynotesPage Component', () => {
  test('renders without crashing', () => {
    render(
    <Provider store={createStore(rootReducer)}>
    <Router>
    <MynotesPage />
    </Router>
    </Provider>
    );
  });

});
