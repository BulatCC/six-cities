import { render, screen } from '@testing-library/react';
import FavoritesEmpty from './favorites-empty';
import { fakeApp } from '../../services/fake-app-for-test';

describe('Component: Favorites', () => {
  test('should render correctly', () => {
    render(fakeApp(<FavoritesEmpty />));
    expect(screen.getByText(/Nothing yet saved./i)).toBeInTheDocument();
    expect(screen.getByText(/Save properties to narrow down search or plan your future trips./i)).toBeInTheDocument();
    expect(screen.getByTestId('empty-img')).toBeInTheDocument();
  });
});
