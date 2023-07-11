import { Container } from '@/components/UI/container';
import { SearchBox } from '@/components/UI/input';
import { LargeHeading } from '@/components/UI/text';
import Header from '@/header';
import useDarkMode from '@/hooks/useDarkMode';

function App() {
  const toggleDarkMode = useDarkMode();
  return (
    <>
      <Header toggleDarkMode={toggleDarkMode} />
      <Container>
        <LargeHeading>Hello World</LargeHeading>
        <SearchBox placeholder="Search for a country..." />
      </Container>
    </>
  );
}

export default App;
