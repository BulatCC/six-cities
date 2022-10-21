import { render, screen } from '@testing-library/react';
import { fakeApp } from '../../services/fake-app-for-test';
import userEvent from '@testing-library/user-event';
import ReviewForm from './review-form';

const HOTEL_ID = '1';

describe('Component: ReviewForm', () => {
  test('should render correctly', () => {
    render(fakeApp(<ReviewForm hotelId={HOTEL_ID} />));
    expect(screen.getByText(/Your review/i)).toBeInTheDocument();
    expect(screen.getByTestId('radio-rate-5')).toBeInTheDocument();
    expect(screen.getByTestId('radio-rate-4')).toBeInTheDocument();
    expect(screen.getByTestId('radio-rate-3')).toBeInTheDocument();
    expect(screen.getByTestId('radio-rate-2')).toBeInTheDocument();
    expect(screen.getByTestId('radio-rate-1')).toBeInTheDocument();
    expect(screen.getByTestId('text-area')).toBeInTheDocument();

    expect(screen.getByTestId('radio-rate-5')).not.toBeChecked();
    expect(screen.getByTestId('radio-rate-4')).not.toBeChecked();
    expect(screen.getByTestId('radio-rate-3')).not.toBeChecked();
    expect(screen.getByTestId('radio-rate-2')).not.toBeChecked();
    expect(screen.getByTestId('radio-rate-1')).not.toBeChecked();

    userEvent.click(screen.getByTestId('radio-rate-5'));
    expect(screen.getByTestId('radio-rate-5')).toBeChecked();
    userEvent.click(screen.getByTestId('radio-rate-4'));
    expect(screen.getByTestId('radio-rate-4')).toBeChecked();
    expect(screen.getByTestId('radio-rate-5')).not.toBeChecked();
    userEvent.click(screen.getByTestId('radio-rate-3'));
    expect(screen.getByTestId('radio-rate-3')).toBeChecked();
    expect(screen.getByTestId('radio-rate-4')).not.toBeChecked();
    userEvent.click(screen.getByTestId('radio-rate-2'));
    expect(screen.getByTestId('radio-rate-2')).toBeChecked();
    expect(screen.getByTestId('radio-rate-3')).not.toBeChecked();
    userEvent.click(screen.getByTestId('radio-rate-1'));
    expect(screen.getByTestId('radio-rate-1')).toBeChecked();
    expect(screen.getByTestId('radio-rate-2')).not.toBeChecked();

    userEvent.type(screen.getByTestId('text-area'), 'fake review');
    expect(screen.getByDisplayValue(/fake review/i)).toBeInTheDocument();
  });
});

