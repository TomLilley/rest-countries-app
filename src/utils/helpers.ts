import { LinkHeader } from '@/types/types';

// range function, accepts number n, returns a list of strings in the range [1, n]
export const range = (n: number) => {
  if (n <= 1 || Number.isNaN(n)) return ['1'];
  return [...Array(n).keys()].map((i) => (i + 1).toString());
};

// get the _page parameter from the url
export const getPageFromUrl = (url: string) => {
  const urlParams = new URLSearchParams(new URL(url).search);
  return urlParams.get('_page') || '';
};

export const getLastPageFromLinksHeader = (links: LinkHeader[]): number => {
  const lastLink = links.find((link) => link.rel === 'last');

  if (lastLink) {
    const lastPage = parseInt(getPageFromUrl(lastLink.url));
    return Number.isNaN(lastPage) || lastPage <= 1 ? 1 : lastPage;
  }
  return 1;
};
