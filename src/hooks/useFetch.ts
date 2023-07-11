import { API_URL } from '@/utils/constants';
import { formatLinksHeadersToPagination } from '@/utils/format';
import { parseLinksHeader } from '@/utils/parseLinksHeader';
import { Country, Pagination, emptyPagination } from '@/utils/types';
import { useState, useEffect } from 'react';

export default function useFetch(searchParams?: string) {
  const [countriesList, setCountriesList] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState<Pagination>({
    ...emptyPagination,
  });

  useEffect(() => {
    // reset loading on params change
    setLoading(true);
    const url = `${API_URL}?${searchParams}`;

    (async () => {
      try {
        const res = await fetch(url);

        if (res.ok) {
          const countriesList = await res.json();
          const links = parseLinksHeader(res.headers.get('link') || '');
          const pagination = formatLinksHeadersToPagination(links);
          setPagination(pagination);
          setCountriesList(countriesList);
          setLoading(false);
        } else {
          throw new Error(res.statusText);
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
          setLoading(false);
          console.error(error.message);
        }
      }
    })();
  }, [searchParams]);

  return { countriesList, loading, error, pagination };
}
