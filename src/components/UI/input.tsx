import clsx from 'clsx';
import { SearchIcon } from './icons';

export const inputStyle =
  'h-12 focus:ring-0 focus-visible:outline-none border-0 rounded-md text-xs bg-white dark:bg-darkblue shadow-box';

export function SearchBox({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="w-full max-w-md">
      <SearchIcon className="h-4 w-4 absolute my-4 ml-8 fill:medgrey dark:fill-white" />
      <input
        className={clsx('pl-18 w-full pr-8', inputStyle, className)}
        type="text"
        {...props}
      />
    </div>
  );
}

interface SelectBoxProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: string[];
}

export function SelectBox({ options, className, ...props }: SelectBoxProps) {
  return (
    <select
      className={clsx('px-6 min-w-select', inputStyle, className)}
      {...props}
    >
      <option value="">Filter by Region</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
