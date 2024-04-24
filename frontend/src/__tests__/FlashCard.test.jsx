import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import FlashCardpage from '../pages/FlashCardpage'; 
import rootReducer from '../reducers/index'; 

jest.mock('axios', () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
  })),
}));

describe('FlashCardpage', () => {
  const store = createStore(rootReducer);

  test('renders without crashing', () => {
    render(
      <Provider store={store}>
        <Router>
          <FlashCardpage />
        </Router>
      </Provider>
    );
  });

});