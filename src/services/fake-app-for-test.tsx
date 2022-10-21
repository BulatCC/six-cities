import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { CityNames, SortType, AuthorizationStatus, AppRoute } from '../consts';
import { mockOffer } from './mock';

export const fakeApp = (component: JSX.Element, routeComponent: JSX.Element | null = null, authorizationStatus: string = AuthorizationStatus.Auth) => {
  const mockStore = configureMockStore();

  const store = mockStore({
    DATA: {
      selectedCity: CityNames.Paris,
      defaultOffers: [mockOffer],
      isDataLoaded: true,
      currentSortType: SortType.Popular,
    },
    USER: {
      authorizationStatus: authorizationStatus,
      userData: {
        email: '',
        avatarUrl: '',
      },
    },
  });

  function FakeMainPage() {
    return <h1>Main page</h1>;
  }

  function FakeLoginPage() {
    return <h1>Login page</h1>;
  }

  return (
    <Provider store={store}>
      <MemoryRouter >
        <>
          {component}
        </>
        <Routes>
          {routeComponent}
          <Route path={AppRoute.Root} element={<FakeMainPage />} />
          <Route path={AppRoute.Login} element={<FakeLoginPage />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};
