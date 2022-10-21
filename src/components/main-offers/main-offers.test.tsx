import { render, screen } from '@testing-library/react';
import { fakeApp } from '../../services/fake-app-for-test';
import MainOffers from './main-offers';
import { mockOffer } from '../../services/mock';

describe('Component: MainOffers', () => {
  test('should render correctly', () => {
    render(fakeApp(<MainOffers offersInCity={[mockOffer]} selectedCity={'Paris'} />));
    expect(screen.getByText(/1 places to stay in Paris/i)).toBeInTheDocument();
  });
});

