import { SearchBox, SelectBox } from '@/components/UI/input';
import CountryList from '@/components/countryList';
import { Country, Region } from '@/utils/types';

export default function CountriesList({
  countriesList,
  searchQuery,
  handleSearchQueryChange,
  handleRegionChange,
  setCountry,
}: {
  countriesList: Country[];
  searchQuery: string;
  handleSearchQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRegionChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  setCountry: (country: string) => void;
}) {
  return (
    <>
      <form className="lg:mb-12 mb-8 md:flex md:justify-between space-y-8 md:space-y-0">
        <SearchBox
          placeholder="Search for a country..."
          value={searchQuery}
          onChange={handleSearchQueryChange}
        />
        <SelectBox
          title="Filter by Region"
          options={Object.values(Region)}
          onChange={handleRegionChange}
        />
      </form>
      <CountryList countryList={countriesList} setCountry={setCountry} />
    </>
  );
}
