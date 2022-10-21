import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import FavoritePage from './favorite-page';
import { AppRoute } from '../../consts';
import { mockOffer, mockOfferFavorite } from '../../services/mock';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AuthorizationStatus } from '../../consts';

function FakeMainPage() {
  return <h1>Main page</h1>;
}

const mockStore = configureMockStore();

const fakeAppFavoriteFalse = (component: JSX.Element) => {
  const store = mockStore({
    DATA: {
      defaultOffers: [mockOffer],
    },
    USER: {
      authorizationStatus: AuthorizationStatus.Auth,
      userData: {
        email: '',
        avatarUrl: '',
      },
    },
  });

  return (
    <Provider store={store}>
      <MemoryRouter >
        {component}
        <Routes>
          <Route path={AppRoute.Root} element={<FakeMainPage />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};

const fakeAppFavoriteTrue = (component: JSX.Element) => {
  const store = mockStore({
    DATA: {
      defaultOffers: [mockOfferFavorite],
    },
    USER: {
      authorizationStatus: AuthorizationStatus.Auth,
      userData: {
        email: '',
        avatarUrl: '',
      },
    },
  });

  return (
    <Provider store={store}>
      <MemoryRouter >
        {component}
        <Routes>
          <Route path={AppRoute.Root} element={<FakeMainPage />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};

describe('Component: FavoritePage', () => {
  test('should render correctly if nothing saved to favorites', () => {
    render(fakeAppFavoriteFalse(<FavoritePage />));
    expect(screen.getByText(/Nothing yet saved/i)).toBeInTheDocument();
  });

  test('should render correctly if saved in favorites', () => {
    render(fakeAppFavoriteTrue(<FavoritePage />));
    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
  });
});
