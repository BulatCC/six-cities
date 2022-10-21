import { render, screen } from '@testing-library/react';
import { fakeApp } from '../../services/fake-app-for-test';
import LocationList from './locations-list';

const CITY_NUMBER = 6;

describe('Component: LocationList', () => {
  test('should render correctly and call filter function', () => {
    render(fakeApp(<LocationList />));
    expect(screen.getAllByTestId('city-name').length).toBe(CITY_NUMBER);
  });
});

