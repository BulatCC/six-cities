import { render, screen } from '@testing-library/react';
import { fakeApp } from '../../services/fake-app-for-test';
import userEvent from '@testing-library/user-event';
import { SortType } from '../../consts';
import Sort from './sort';

describe('Component: Sort', () => {
  test('should render sort menu', () => {
    render(fakeApp(<Sort/>));
    expect(screen.getByText(/Sort by/i)).toBeInTheDocument();
    userEvent.click(screen.getByTestId('sort'));
    expect(screen.getByText(new RegExp(`${SortType.PriceHighToLow}`, 'i'))).toBeInTheDocument();
    expect(screen.getByTestId(/sort-dropdown/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(new RegExp(`${SortType.PriceHighToLow}`, 'i')));
    expect(screen.queryByText(new RegExp(`${SortType.TopRated}`, 'i'))).not.toBeInTheDocument();
  });
});

