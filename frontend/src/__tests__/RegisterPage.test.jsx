import React from 'react';
import { render } from '@testing-library/react';
import Registerpage from '../pages/Registerpage'; 

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import rootReducer from '../reducers/index'; 

test('renders Registerpage component without crashing', () => {
  render(
  <Provider store={createStore(rootReducer)}>
  <Router>
  <Registerpage />;
  </Router>
  </Provider>
  )
});