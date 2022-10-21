import { render, screen } from '@testing-library/react';
import Favorites from './favorites';
import { mockOfferFavorite } from '../../services/mock';
import { fakeApp } from '../../services/fake-app-for-test';

describe('Component: Favorites', () => {
  test('should render correctly', () => {
    render(fakeApp(<Favorites favoriteData={[mockOfferFavorite]} />));
    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
    expect(screen.getByTestId('city')).toBeInTheDocument();
    expect(screen.getByTestId('card-list')).toBeInTheDocument();
  });
});
