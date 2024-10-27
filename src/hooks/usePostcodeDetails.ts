import { useQuery } from 'react-query';
import { PostCodeDetails } from '@/types/Postcode';
import { fetchPostcodeDetails } from '@/services/api/fetchPostcodeDetails';

export const usePostcodeDetails = (query: string) => {
  return useQuery<PostCodeDetails, Error>(['postcodeDetails', query], () => fetchPostcodeDetails(query), {
    enabled: !!query, // Only fetch if there's a query
  });
};
