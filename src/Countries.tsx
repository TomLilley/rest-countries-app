import useCountries from '@/hooks/useCountries';
import { Region } from '@/types/types';
import CountriesListView from '@/views/CountriesListView';
import CountryDetailView from '@/views/CountryDetailView';
import ErrorView from '@/views/Error';
import { useState } from 'react';
import PaginationNav from '@/components/paginationNav';

export default function Countries() {
  const [searchQuery, setSearchQuery] = useState('');
  const [region, setRegion] = useState<Region | undefined>(undefined);
  const [country, setCountry] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const { countriesList, loading, error, lastPage } = useCountries(
    searchQuery,
    region,
    page,
  );

  const handleSearchQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchQuery(event.target.value);
    setPage(1);
  };

  const handleRegionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === '') {
      setRegion(undefined);
    } else if (Object.values(Region).includes(event.target.value as Region)) {
      setRegion(event.target.value as Region);
    }
    setPage(1);
  };

  const handlePageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPage(parseInt(event.target.value));
  };

  if (!loading && error) return <ErrorView error={error} />;

  if (country) {
    return <CountryDetailView countryCode={country} setCountry={setCountry} />;
  } else {
    return (
      <>
        <CountriesListView
          countriesList={countriesList}
          loading={loading}
          searchQuery={searchQuery}
          handleSearchQueryChange={handleSearchQueryChange}
          handleRegionChange={handleRegionChange}
          setCountry={setCountry}
        />
        <PaginationNav
          page={page}
          setPage={setPage}
          lastPage={lastPage}
          handlePageChange={handlePageChange}
        />
      </>
    );
  }
}
