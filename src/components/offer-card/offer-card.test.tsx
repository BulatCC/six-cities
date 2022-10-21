import { render, screen } from '@testing-library/react';
import { Route } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { fakeApp } from '../../services/fake-app-for-test';
import OfferCard from './offer-card';
import { mockOffer } from '../../services/mock';
import { AppRoute } from '../../consts';

describe('Component: MainOffers', () => {
  const handleCardHover = jest.fn();

  function FakeOffer() {
    return <h1>Offer page</h1>;
  }

  const fakeOfferPage = <Route path={AppRoute.Offer} element={<FakeOffer />} />;
  test('should render correctly and redirect to offer-page by link click', () => {
    render(fakeApp(<OfferCard offer={mockOffer} handleCardHover={handleCardHover} className={'fake-class-name'} />, fakeOfferPage));
    expect(screen.getByText(/night/i)).toBeInTheDocument();
    expect(screen.getByText(/Rating/i)).toBeInTheDocument();
    userEvent.click(screen.getByTestId('offer-link'));
    expect(screen.getByText(/Offer page/i)).toBeInTheDocument();
  });
});
