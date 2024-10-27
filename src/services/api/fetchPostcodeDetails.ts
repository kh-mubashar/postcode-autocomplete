import { PostCodeDetails } from '@/types/Postcode';
import axios from 'axios';

export const fetchPostcodeDetails = async (query: string): Promise<PostCodeDetails> => {
  const { data } = await axios.get(`https://api.postcodes.io/postcodes/${query}/`);
  return data.result || [];
};
