import axios from 'axios';
import { Postcode } from '@/types/Postcode';

export const fetchPostcodeSuggestions = async (query: string): Promise<Postcode[]> => {
  const { data } = await axios.get(`https://api.postcodes.io/postcodes/${query}/autocomplete`);
  return data.result || [];
};
