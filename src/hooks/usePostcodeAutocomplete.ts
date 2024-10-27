import { useQuery } from 'react-query';
import { Postcode } from '@/types/Postcode';
import { fetchPostcodeSuggestions } from '@/services/api/fetchPostcodeSuggestions';

export const usePostcodeAutocomplete = (query: string) => {
  return useQuery<Postcode[], Error>(['postcodeSuggestions', query], () => fetchPostcodeSuggestions(query), {
    enabled: !!query, // Only fetch if there's a query
  });
};
