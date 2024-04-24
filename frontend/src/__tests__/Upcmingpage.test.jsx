import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../reducers/index'; // Import your rootReducer
import Upcomingpage from '../pages/Upcomingpage'; 
import { BrowserRouter as Router } from 'react-router-dom';

test('renders Upcomingpage component without crashing', () => {
  // Create a mock store
  const store = createStore(rootReducer);

  render(
    <Provider store={store}>
      <Router>
        <Upcomingpage />
      </Router>
    </Provider>
  );
});