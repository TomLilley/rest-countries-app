import { Button } from '@/components/UI/button';
import { ArrowLeftIcon, ArrowRightIcon } from '@/components/UI/icons';
import { SelectBox } from '@/components/UI/input';
import useCountries from '@/hooks/useCountries';
import { range } from '@/utils/helpers';
import { Region } from '@/types/types';
import CountriesListView from '@/views/CountriesListView';
import CountryDetailView from '@/views/CountryDetailView';
import ErrorView from '@/views/Error';
import { useState } from 'react';

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

  console.log(lastPage);

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
    console.log(lastPage);
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
          <Button
            className="dark:fill-white dark:disabled:fill-verydarkblue fill-verydarkblue disabled:fill-medgrey"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            <ArrowLeftIcon className="h-4.5 w-4.5 lg:h-5 lg:w-5" />
          </Button>
          <SelectBox
            className="px-8"
            onChange={handlePageChange}
            options={range(lastPage)}
            value={page.toString()}
            disabled={lastPage === 1}
          />
          <Button
            className="dark:fill-white dark:disabled:fill-verydarkblue fill-verydarkblue disabled:fill-medgrey"
            onClick={() => setPage(page + 1)}
            disabled={page === lastPage || lastPage === 1}
          >
            <ArrowRightIcon className="h-4.5 w-4.5 lg:h-5 lg:w-5" />
          </Button>
        </nav>
      </>
    );
  }
}
