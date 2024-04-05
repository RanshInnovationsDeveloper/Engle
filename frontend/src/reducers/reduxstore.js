import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // or any middleware you use
import rootReducer from './index'; // import your root reducer

// Create a mock store function
export function createMockStore() {
  const store = createStore(rootReducer, applyMiddleware(thunk));
  return store;
}
