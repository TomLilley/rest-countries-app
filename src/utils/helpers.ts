import { LinkHeader } from '@/utils/types';

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

// get the last page number from the links header
export const getLastPageFromLinksHeader = (links: LinkHeader[]) => {
  for (const link of links) {
    if (link.rel === 'last') {
      const lastPage = parseInt(getPageFromUrl(link.url));
      if (lastPage <= 1 || Number.isNaN(lastPage)) return 1;
      return lastPage;
    }
  }
  return 1;
};
