import { LoadingIcon } from '@/components/UI/icons';

export default function LoadingView() {
  return (
    <div className="flex justify-center items-center">
      <LoadingIcon className="fill-verydarkblue dark:fill-white animate-spin" />
    </div>
  );
}
