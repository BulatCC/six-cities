import { render, screen } from '@testing-library/react';
import { fakeApp } from '../../services/fake-app-for-test';
import Map from './map';
import { mockOffer } from '../../services/mock';

describe('Component: Map', () => {
  test('should render correctly', () => {
    render(fakeApp(<Map offers={[mockOffer]} activeCard={1} />));
    expect(screen.getByTestId('map')).toBeInTheDocument();
  });
});

