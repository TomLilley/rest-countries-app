import useCountries from '@/hooks/useCountries';
import { Region } from '@/utils/types';
import CountriesList from '@/views/CountriesList';
import ErrorView from '@/views/Error';
import LoadingView from '@/views/Loading';
import { useState } from 'react';

export default function Countries() {
  const [searchQuery, setSearchQuery] = useState('');
  const [region, setRegion] = useState<Region | undefined>(undefined);
  const [country, setCountry] = useState<string>('');

  const {
    data: countriesList,
    loading,
    error,
  } = useCountries(searchQuery, region);

  const handleSearchQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchQuery(event.target.value);
  };

  const handleRegionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === '') {
      setRegion(undefined);
    } else if (Object.values(Region).includes(event.target.value as Region)) {
      setRegion(event.target.value as Region);
    }
  };

  if (loading) return <LoadingView />;
  if (error) return <ErrorView error={error} />;

  if (country) {
    return <div>Country: {country}</div>;
  } else {
    return (
      <CountriesList
        countriesList={countriesList}
        searchQuery={searchQuery}
        handleSearchQueryChange={handleSearchQueryChange}
        handleRegionChange={handleRegionChange}
        setCountry={setCountry}
      />
    );
  }
}
