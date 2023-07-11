import { Container } from '@/components/UI/container';
import { SearchBox } from '@/components/UI/input';
import { LargeHeading } from '@/components/UI/text';
import Header from '@/header';

function App() {
  return (
    <>
      <Header />
      <Container>
        <LargeHeading>Hello World</LargeHeading>
        <SearchBox placeholder="Search for a country..." />
      </Container>
    </>
  );
}

export default App;
