import { LargeHeading } from '@/components/UI/text';

export default function ErrorView({ error }: { error: string }) {
  return (
    <>
      <LargeHeading>Uh oh.... Something went wrong</LargeHeading>
      <p>{error}</p>
    </>
  );
}
