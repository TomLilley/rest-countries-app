import { Button } from '@/components/UI/button';
import CountryDetail from '@/components/countryDetail';
import useCountry from '@/hooks/useCountry';
import ErrorView from '@/views/Error';
import LoadingView from '@/views/Loading';

export default function CountryDetailView({
  countryCode,
  setCountry,
}: {
  countryCode: string;
  setCountry: (arg0: string) => void;
}) {
  const { data, loading, error } = useCountry(countryCode);

  if (!loading) {
    if (error) return <ErrorView error={error} />;
    if (data.length < 1) return <ErrorView error="Country not found" />;
  }
  const country = data[0];
  return (
    <>
      <nav className="mt-10 mb-16 lg:mt-20 lg:mb-20">
        <Button onClick={() => setCountry('')}>Go Back</Button>
      </nav>
      {loading ? (
        <LoadingView />
      ) : (
        <CountryDetail country={country} setCountry={setCountry} />
      )}
    </>
  );
}
