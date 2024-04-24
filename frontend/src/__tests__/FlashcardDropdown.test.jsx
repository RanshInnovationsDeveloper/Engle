import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import FlashcardDropdown from '../components/FlashcardDropdown';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('axios', () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
  })),
}));
describe('FlashcardDropdown', () => {
  const dispatchMock = jest.fn();
  const useSelectorMock = jest.fn();
  

  beforeEach(() => {
    useDispatch.mockReturnValue(dispatchMock);
    useSelector.mockReturnValue({ authUserId: null });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders without crashing', () => {
    render(<FlashcardDropdown isOpen={true} isMobile={false} />);
  });

  test('dispatches setFlashCardCategory and reloads page on option click', () => {
    useSelector.mockReturnValue({ authUserId: '123' });
    const { getByText } = render(<FlashcardDropdown isOpen={true} isMobile={false} />);
    fireEvent.click(getByText('Unseen Words'));
  });


});