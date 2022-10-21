import { render, screen } from '@testing-library/react';
import { fakeApp } from '../../services/fake-app-for-test';
import userEvent from '@testing-library/user-event';
import { Route } from 'react-router-dom';
import Header from './header';
import { AppRoute, AuthorizationStatus } from '../../consts';

describe('Component: FavoriteCard', () => {
  test('should render correctly and redirect to main page by cklicking logo', () => {
    render(fakeApp(<Header/>));
    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByTestId('avatar')).toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
    userEvent.click(screen.getByTestId('logo-link'));
    expect(screen.getByText(/Main page/i)).toBeInTheDocument();
  });

  test('should redirect to login page by cklicking "sign in" if user unauthorized', () => {
    function FakeLoginPage() {
      return <h1>Login page</h1>;
    }

    const fakeLoginPage = <Route path={AppRoute.Login} element={<FakeLoginPage />} />;

    render(fakeApp(<Header/>, fakeLoginPage, AuthorizationStatus.NoAuth));
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
    userEvent.click(screen.getByTestId('login-link'));
    expect(screen.getByText(/Login page/i)).toBeInTheDocument();
  });

  test('should redirect to favorites page by cklicking "user" if user authorized', () => {
    function FakeFavoritePage() {
      return <h1>Favorite page</h1>;
    }

    const fakeFavoritePage = <Route path={AppRoute.Favorites} element={<FakeFavoritePage />} />;

    render(fakeApp(<Header/>, fakeFavoritePage));
    expect(screen.getByTestId('favorite-link')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('favorite-link'));
    expect(screen.getByText(/Favorite page/i)).toBeInTheDocument();
  });
});
