import React from 'react';
import { render } from '@testing-library/react';
import Registerpage from '../pages/Registerpage';

// Mock any context providers or dependencies used within Registerpage
jest.mock('../components/Header', () => () => <div>MockedHeader</div>);
jest.mock('../components/Registercard', () => () => <div>MockedRegistercard</div>);

describe('Registerpage Component', () => {
  test('renders without crashing', () => {
    render(<Registerpage />);
  });
});
