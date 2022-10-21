import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route } from 'react-router-dom';
import FavoriteButton from './favorite-button';
import { fakeApp } from '../../services/fake-app-for-test';
import { AuthorizationStatus, AppRoute } from '../../consts';

const fakeClassName = 'fake-class';

const buttonComponent = (
  <FavoriteButton
    props={{ id: 1, isFavorite: true }}
    style={{
      button: fakeClassName,
      svg: fakeClassName,
      svgWidth: 18,
      svgHeight: 19,
    }}
  />
);

function FakeLoginPage() {
  return <h1>Login page</h1>;
}

const fakeLoginPage = <Route path={AppRoute.Login} element={<FakeLoginPage />} />;

describe('Component: FavoriteButton', () => {
  test('should change class by click if user authorized', () => {
    render(fakeApp(buttonComponent));
    expect(screen.getByTestId('favorite-button')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('favorite-button'));
    expect(screen.getByTestId('favorite-button').classList.contains(`${fakeClassName}--active`)).toBe(true);
  });

  test('should redirect to login page if user unauthorized', () => {
    render(fakeApp(buttonComponent, fakeLoginPage, AuthorizationStatus.NoAuth));
    expect(screen.getByTestId('favorite-button')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('favorite-button'));
    expect(screen.getByText(/Login page/i)).toBeInTheDocument();
  });
});
