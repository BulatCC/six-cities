import { render, screen } from '@testing-library/react';
import { fakeApp } from '../../services/fake-app-for-test';
import OffersList from './offers-list';
import { mockOffer } from '../../services/mock';

describe('Component: MainOffers', () => {
  const handleHoveredCard = jest.fn();

  test('should render correctly', () => {
    render(fakeApp(<OffersList offers={[mockOffer]} handleHoveredCard={handleHoveredCard} />));
    expect(screen.getByTestId('offers-list')).toBeInTheDocument();
  });
});

