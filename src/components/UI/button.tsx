import clsx from 'clsx';

export function Button({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={clsx(
        'text-xs py-1.5 px-8 shadow-box lg:text-base bg-white dark:bg-darkblue rounded-md inline-flex items-center dark:disabled:text-verydarkblue disabled:text-medgrey',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
