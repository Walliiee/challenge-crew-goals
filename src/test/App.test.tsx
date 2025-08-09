import { render, screen } from '@testing-library/react';
import App from '../App';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';

describe('App', () => {
  it('should render the App component', () => {
    render(<App />);
    expect(screen.getByText('Family Challenge')).toBeInTheDocument();
  });
});
