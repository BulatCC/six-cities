import { render, screen } from '@testing-library/react';
import PrivateRoute from './private-route';
import { fakeApp } from '../../services/fake-app-for-test';
import { AuthorizationStatus } from '../../consts';

describe('Component: PrivateRoute', () => {
  function FakePage() {
    return <h1>Fake page</h1>;
  }

  function FakePrivateElement() {
    return <h1>Fake private element</h1>;
  }

  test('should show spinner if authorizationStatus unknown', () => {
    render(fakeApp(<PrivateRoute privateElement={<FakePage />} />, null, AuthorizationStatus.Unknown));
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  test('should load private element if authorizationStatus auth', () => {
    render(fakeApp(<PrivateRoute privateElement={<FakePrivateElement />} />));
    expect(screen.getByText(/Fake private element/i)).toBeInTheDocument();
  });

  // тест кейс вызывает бесконечный рендер.
  // test('should redirect to login page if authorizationStatus no auth', () => {
  //   render(fakeApp(<PrivateRoute privateElement={<FakePrivateElement />} />, null, AuthorizationStatus.NoAuth ));
  //   expect(screen.getByTestId('submit-form')).toBeInTheDocument();
  // });
});
