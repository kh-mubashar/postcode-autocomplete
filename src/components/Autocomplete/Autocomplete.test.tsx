import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Autocomplete } from './Autocomplete';

const queryClient = new QueryClient();

describe('Autocomplete Component', () => {
  it('renders input box correctly', () => {
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <Autocomplete />
      </QueryClientProvider>
    );
    const input = container.querySelector('input');
    expect(input).toBeInTheDocument();
  });

  it('displays suggestions on input', async () => {
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <Autocomplete />
      </QueryClientProvider>
    );

    const input = container.querySelector('input');
    fireEvent.change(input!, { target: { value: 'SW1' } });

    const suggestions = await screen.findAllByRole('button');
    expect(suggestions.length).toBeGreaterThan(0);
  });
});
