import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import rootReducer from '../reducers/index'; 
import { render } from '@testing-library/react';
import FavouriteButton from '../components/FavouriteButton'; 

jest.mock('axios', () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
  })),
}));

describe('FavouriteButton', () => {
  const store = createStore(rootReducer);

  test('renders without crashing', () => {
    render(
      <Provider store={store}>
        <Router>
          <FavouriteButton />
        </Router>
      </Provider>
    );
  });

});