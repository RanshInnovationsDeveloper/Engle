import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react'; // Import screen
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import { createMockStore } from '../reducers/reduxstore';
import Registercard from '../components/Registercard';
import { signup } from '../services/operations/authServices'; // Import the signup function

jest.mock('../services/operations/authServices', () => ({
  signup: jest.fn().mockResolvedValue({}),
}));
const store = createMockStore();

describe('Registercard Component', () => {
  test('Submitting the form with matching passwords', async () => {
    render(
      <Provider store={store}>
        <Router> {/* Wrap your component with Router */}
          <Registercard />
        </Router>
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText('Enter username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText('Enter Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'Password' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'Password' } });
    fireEvent.submit(screen.getByText('Sign Up'));

    await waitFor(() => {
      expect(signup).toHaveBeenCalledWith("test@example.com","Password","testuser");
    });
  });

  test('Submitting the form with non-matching passwords', async () => {
    render(
      <Provider store={store}>
        <Router> {/* Wrap your component with Router */}
          <Registercard />
        </Router>
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText('Enter username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText('Enter Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'Password' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'Password' } });
    fireEvent.submit(screen.getByText('Sign Up'));

    await waitFor(() => {
      expect(signup).toHaveBeenCalledWith("test@example.com","Password","testuser");
    });
  });
});
