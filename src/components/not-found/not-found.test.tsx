import { render, screen } from '@testing-library/react';
import NotFound from './not-found';
import { fakeApp } from '../../services/fake-app-for-test';

describe('Component: NotFound', () => {
  test('should render correctly', () => {
    render(fakeApp(<NotFound/>));
    expect(screen.getByText(/Страница не найдена/i)).toBeInTheDocument();
    expect(screen.getByText(/На главную/i)).toBeInTheDocument();
  });
});
