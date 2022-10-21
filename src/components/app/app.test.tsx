import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import App from '../app/app';
import { AppRoute, CityNames, SortType, AuthorizationStatus } from '../../consts';
import { mockOffer } from '../../services/mock';

const mockStore = configureMockStore();

const store = mockStore({
  DATA: {
    selectedCity: CityNames.Paris,
    defaultOffers: [mockOffer],
    isDataLoaded: true,
    currentSortType: SortType.Popular,
  },
  USER: {
    authorizationStatus: AuthorizationStatus.NoAuth,
    userData: {
      email: '',
      avatarUrl: '',
    },
  },
});

function fakeApp (route: string) {
  return (
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>
        <App />
      </MemoryRouter>
    </Provider>
  );
}

describe('Application Routing', () => {
  test('should render "main" when user navigate to "/"', () => {
    render(fakeApp(AppRoute.Root));
    expect(screen.getByText(/places to stay in/i)).toBeInTheDocument();
  });

  test('should render "login" when user navigate to "/login"', () => {
    render(fakeApp(AppRoute.Login));
    expect(screen.getByTestId(/submit-form/i)).toBeInTheDocument();
  });

  test('should render "not-found" when user navigate to unexicted path', () => {
    render(fakeApp('/fakepath'));
    expect(screen.getByText(/Страница не найдена/i)).toBeInTheDocument();
  });
});
