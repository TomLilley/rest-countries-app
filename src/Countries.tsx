import { Button } from '@/components/UI/button';
import { SelectBox } from '@/components/UI/input';
import useCountries from '@/hooks/useCountries';
import { range } from '@/utils/helpers';
import { Region } from '@/utils/types';
import CountriesListView from '@/views/CountriesListView';
import CountryDetailView from '@/views/CountryDetailView';
import ErrorView from '@/views/Error';
import { useState } from 'react';

export default function Countries() {
  const [searchQuery, setSearchQuery] = useState('');
  const [region, setRegion] = useState<Region | undefined>(undefined);
  const [country, setCountry] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const { countriesList, loading, error, pagination } = useCountries(
    searchQuery,
    region,
    page,
  );

  console.log(pagination);

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
        <nav className="mt-10 flex space-x-8 justify-center">
          <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
            Previous
          </Button>
          <SelectBox
            className="px-8"
            onChange={handlePageChange}
            options={range(parseInt(pagination.last))}
            value={page.toString()}
          />
          <Button onClick={() => setPage(page + 1)}>Next</Button>
        </nav>
      </>
    );
  }
}
