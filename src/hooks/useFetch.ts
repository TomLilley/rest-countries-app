import { API_URL } from '@/utils/constants';
import { Country } from '@/utils/types';
import { useState, useEffect, SetStateAction } from 'react';

export default function useFetch(searchParams?: string) {
  const [data, setData] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const url = `${API_URL}?${searchParams}`;

    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(res.statusText);
        }
      })
      .then((data: Country[]) => {
        setData(data);
        setLoading(false);
      })
      .catch((error: SetStateAction<string>) => {
        setError(error.toString());
        setLoading(false);
      });
  }, [searchParams]);

  return { data, loading, error };
}
