import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import Main from './main';
import { CityNames, AuthorizationStatus, AppRoute } from '../../consts';
import { fakeApp } from '../../services/fake-app-for-test';

const fakeAppLoading = (component: JSX.Element) => {
  const mockStore = configureMockStore();

  const store = mockStore({
    DATA: {
      selectedCity: CityNames.Paris,
      defaultOffers: [],
      isDataLoaded: false,
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
        <Routes>
          <Route path={AppRoute.Root} element={component} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};

const fakeAppNoData = (component: JSX.Element) => {
  const mockStore = configureMockStore();

  const store = mockStore({
    DATA: {
      selectedCity: CityNames.Paris,
      defaultOffers: [],
      isDataLoaded: true,
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
        <Routes>
          <Route path={AppRoute.Root} element={component} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};

describe('Component: Main', () => {
  test('should show offers if data is loaded', () => {
    render(fakeApp(<Main />));
    expect(screen.getByText(/places to stay in/i)).toBeInTheDocument();
  });

  test('should show spinner if data is loading', () => {
    render(fakeAppLoading(<Main />));
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  test('should show "No places to stay available" if no places available', () => {
    render(fakeAppNoData(<Main />));
    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
  });
});

