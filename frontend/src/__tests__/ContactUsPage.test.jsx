import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactUspage from '../pages/ContactUspage';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from "../reducers/index"
import '@testing-library/jest-dom';


jest.mock('axios', () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
  })),
}));

test('renders ContactUspage and checks form submission', () => {
  const store = createStore(rootReducer);
  render(
  <Provider store={store}>
  <Router>
  <ContactUspage />
  </Router>
  </Provider>
  );
  
  const nameInput = screen.getByLabelText('Name');
  const emailInput = screen.getByLabelText('Email');
  const subjectInput = screen.getByLabelText('Subject');
  const messageInput = screen.getByLabelText('Message');
  const submitButton = screen.getByRole('button', { name: /Submit/i });

expect(nameInput).toBeVisible();
expect(emailInput).toBeVisible();
expect(subjectInput).toBeVisible();
expect(messageInput).toBeVisible();
expect(submitButton).toBeVisible();

});