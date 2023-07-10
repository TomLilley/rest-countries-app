import clsx from 'clsx';

export function Button({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={clsx(
        'text-xs py-1.5 px-8 shadow-button dark:shadow-darkbutton bg-white dark:bg-darkblue rounded-sm',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
