import { render, screen } from '@testing-library/react';
import { fakeApp } from '../../services/fake-app-for-test';
import userEvent from '@testing-library/user-event';
import Login from './login';
import { AuthorizationStatus } from '../../consts';

describe('Component: Login', () => {
  test('should show spinner if authorization status "unknown"', () => {
    render(fakeApp(<Login />, null, AuthorizationStatus.Unknown));
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  test('should render correctly', () => {
    render(fakeApp(<Login />, null, AuthorizationStatus.NoAuth));
    expect(screen.getByTestId('submit-form')).toBeInTheDocument();

    userEvent.type(screen.getByTestId('login'), 'vasya123');
    userEvent.type(screen.getByTestId('password'), '123456');

    expect(screen.getByDisplayValue(/vasya123/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/123456/i)).toBeInTheDocument();
  });

  // тест кейс вызывает бесконечный рендер.
  // test('should redirect to main page if authorization status "auth"', () => {
  //   render(fakeApp(<Login /> ));
  //   expect(screen.getByText(/Main page/i)).toBeInTheDocument();
  // });
});

