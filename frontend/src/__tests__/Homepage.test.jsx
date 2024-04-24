import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import Homepage from '../pages/Homepage';
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile, signOut, sendPasswordResetEmail, signInWithEmailAndPassword ,onAuthStateChanged} from  'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../reducers/index'; // replace with the actual path

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock("firebase/auth")
jest.mock("firebase/firestore")
describe('Homepage', () => {
  const store=createStore(rootReducer)
  const navigate = jest.fn();
  useNavigate.mockReturnValue(navigate);
  
  test('renders without crashing', () => {
    render(
      <Provider store={store}>
        <Homepage />
      </Provider>
    );
  });

  


});