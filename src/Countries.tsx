import { SearchBox, SelectBox } from '@/components/UI/input';
import CountryList from '@/components/countryList';
import useFetch from '@/hooks/useFetch';
import { Region } from '@/utils/types';
import ErrorView from '@/views/Error';
import LoadingView from '@/views/Loading';

export default function Countries() {
  const { data, loading, error } = useFetch();
  const countriesList = data;
  if (loading) return <LoadingView />;
  if (error) return <ErrorView error={error} />;
  return (
    <>
      <form className="lg:mb-12 mb-8 md:flex md:justify-between space-y-8 md:space-y-0">
        <SearchBox placeholder="Search for a country..." />
        <SelectBox options={Object.values(Region)} />
      </form>
      <CountryList countryList={countriesList} />
    </>
  );
}
