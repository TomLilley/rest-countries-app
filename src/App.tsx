import { Container } from '@/components/UI/container';
import { SearchBox } from '@/components/UI/input';
import { LargeHeading } from '@/components/UI/text';
import Header from '@/components/header';
import useDarkMode from '@/hooks/useDarkMode';
import data from '../data.json';
import { Country } from '@/types';
import CountryList from '@/views/countryList';

function App() {
  const toggleDarkMode = useDarkMode();
  const countriesList = data.countries as Country[];
  return (
    <>
      <Header toggleDarkMode={toggleDarkMode} />
      <Container>
        <LargeHeading>Hello World</LargeHeading>
        <SearchBox placeholder="Search for a country..." />
        <CountryList countryList={countriesList} />
      </Container>
    </>
  );
}

export default App;
