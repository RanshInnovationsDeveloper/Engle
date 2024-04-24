import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore } from 'redux';
import rootReducer from '../reducers/index'; // Import your rootReducer
import Notecard from '../components/Notecard'; // Import your Notecard component

test('renders Notecard component without crashing', () => {
  // Create a mock store
  const store = createStore(rootReducer);

  render(
    <Provider store={store}>
      <Router>
        <Notecard />
      </Router>
    </Provider>
  );

});