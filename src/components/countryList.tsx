import { CardWithImage } from '@/components/UI/card';
import { Country } from '@/utils/types';

export default function CountryList({
  countryList,
}: {
  countryList: Country[];
}) {
  return (
    <div className="grid grid-cols-countries  items-stretch justify-around lg:justify-between gap-x-8 lg:gap-y-16 gap-y-10">
      {countryList.map((country) => (
        <button key={country.name} type="button">
          <CardWithImage
            image={country.flags.png}
            name={country.name}
            details={[
              {
                title: 'Population',
                body: country.population.toLocaleString(),
              },
              { title: 'Region', body: country.region },
              { title: 'Capital', body: country.capital || 'None' },
            ]}
          />
        </button>
      ))}
    </div>
  );
}
