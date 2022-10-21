import { render, screen } from '@testing-library/react';
import { fakeApp } from '../../services/fake-app-for-test';
import userEvent from '@testing-library/user-event';
import { Route } from 'react-router-dom';
import FavoriteCard from './favorite-card';
import { AppRoute } from '../../consts';


const fakeFavoriteCardComponent = (
  <FavoriteCard offer={{
    isFavorite: true,
    price: 100,
    title: 'fakeTitle',
    type: 'fakeType',
    rating: 4,
    previewImage: 'fakePath',
    id: 2,
    isPremium: false,
  }}
  />
);

function FakeOfferPage() {
  return <h1>Offer page</h1>;
}

const fakeOfferComponent = <Route path={`${AppRoute.Offer}`} element={<FakeOfferPage />} />;

describe('Component: FavoriteCard', () => {
  test('should render correctly and redirec to main page by cklicking link', () => {
    render(fakeApp(fakeFavoriteCardComponent, fakeOfferComponent));
    expect(screen.getByTestId('favorite-img')).toBeInTheDocument();
    expect(screen.getByTestId('favorite-price')).toBeInTheDocument();
    expect(screen.getByTestId('favorite-button')).toBeInTheDocument();
    expect(screen.getByTestId('favorite-title')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('favorite-img-link'));
    expect(screen.getByText(/Offer page/i)).toBeInTheDocument();
    userEvent.click(screen.getByTestId('favorite-title'));
    expect(screen.getByText(/Offer page/i)).toBeInTheDocument();
  });
});
