import useFetch from '@/hooks/useFetch';
import { Region } from '@/types/types';

export default function useCountries(
  search?: string,
  region?: Region,
  page = 1,
) {
  const query = new URLSearchParams();
  if (search) query.append('q', search);
  if (region) query.append('region', region);
  query.append('_limit', '20');
  query.append('_page', page.toString());
  return useFetch(query.toString());
}
