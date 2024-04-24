import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer';
import "@testing-library/jest-dom"
describe('Footer', () => {
  test('renders Company section', () => {
    render(<Footer />);
    const companySection = screen.getByText(/Company/i);
    expect(companySection).toBeInTheDocument();
  });

  test('renders Resources section', () => {
    render(<Footer />);
    const resourcesSection = screen.getByText(/Resources/i);
    expect(resourcesSection).toBeInTheDocument();
  });

  test('renders Product section', () => {
    render(<Footer />);
    const productSection = screen.getByText(/Product/i);
    expect(productSection).toBeInTheDocument();
  });

});