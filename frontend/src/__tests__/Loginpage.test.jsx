import React from 'react';
import { render } from '@testing-library/react';
import Loginpage from '../pages/Loginpage';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import rootReducer from '../reducers/index'; 
describe('Loginpage', () => {
  test('renders without crashing', () => {
    const { getByText } = render(
    <Provider store={createStore(rootReducer)}>
    <Router>
    <Loginpage />
    </Router>
    </Provider>);
    
  });
});