import { render, screen } from '@testing-library/react';
import { fakeApp } from '../../services/fake-app-for-test';
import Reviews from './reviews';

const HOTEL_ID = '1';

describe('Component: Reviews', () => {
  test('should render correctly', () => {
    render(fakeApp(<Reviews hotelId={HOTEL_ID} />));
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
  });
});

