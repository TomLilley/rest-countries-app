import { Button } from '@/components/UI/button';
import { ArrowLeftIcon, ArrowRightIcon } from '@/components/UI/icons';
import { SelectBox } from '@/components/UI/input';
import { range } from '@/utils/helpers';

export default function PaginationNav({
  page,
  setPage,
  lastPage,
  handlePageChange,
}: {
  page: number;
  setPage: (page: number) => void;
  lastPage: number;
  handlePageChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <nav className="mt-10 flex space-x-8 justify-center">
      <Button
        aria-label="Go to the previous page"
        className="dark:disabled:fill-verydarkblue disabled:fill-medgrey"
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
      >
        <ArrowLeftIcon className="h-4.5 w-4.5 lg:h-5 lg:w-5" />
      </Button>
      <SelectBox
        aria-label="navigate to page"
        className="pl-8 pr-10"
        onChange={handlePageChange}
        options={range(lastPage)}
        value={page.toString()}
        disabled={lastPage === 1}
      />
      <Button
        aria-label="Go to the next page"
        className="dark:disabled:fill-verydarkblue disabled:fill-medgrey"
        onClick={() => setPage(page + 1)}
        disabled={page === lastPage || lastPage === 1}
      >
        <ArrowRightIcon className="h-4.5 w-4.5 lg:h-5 lg:w-5" />
      </Button>
    </nav>
  );
}
