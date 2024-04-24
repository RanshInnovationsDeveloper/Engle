import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../reducers/index'; // Import your rootReducer
import { BrowserRouter as Router } from 'react-router-dom';
import Registercard from '../components/Registercard'; // Import your Registercard component

test('renders Registercard component without crashing', () => {
  // Create a mock store
  const store = createStore(rootReducer);

  render(
    <Provider store={store}>
      <Router>
        <Registercard />
      </Router>
    </Provider>
  );

  // If the component renders without throwing an error, the test will pass.
});