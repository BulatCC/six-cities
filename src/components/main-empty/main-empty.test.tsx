import { render, screen } from '@testing-library/react';
import MainEmpty from './main-empty';
import { fakeApp } from '../../services/fake-app-for-test';

describe('Component: MainEmpty', () => {
  test('should render correctly', () => {
    render(fakeApp(<MainEmpty selectedCity={'fakeCity'} />));
    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
    expect(screen.getByText(/We could not find any property available at the moment in fakeCity/i)).toBeInTheDocument();
  });
});

