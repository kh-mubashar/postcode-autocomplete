import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Autocomplete } from './Autocomplete';

const queryClient = new QueryClient();

describe('Autocomplete Component', () => {
  it('renders input box correctly', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Autocomplete />
      </QueryClientProvider>
    );
    const input = screen.getByPlaceholderText('Enter postcode');
    expect(input).toBeInTheDocument();
  });

  it('displays suggestions on input', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Autocomplete />
      </QueryClientProvider>
    );

    const input = screen.getByPlaceholderText('Enter postcode');
    fireEvent.change(input, { target: { value: 'SW1' } });

    const suggestions = await screen.findAllByRole('listitem');
    expect(suggestions.length).toBeGreaterThan(0);
  });
});
