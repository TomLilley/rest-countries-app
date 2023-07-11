import { LinkHeader, Pagination, emptyPagination } from '@/utils/types';

// format a number as a string with commas seperating the thousands
export const formatNumberToString = (num: number) => {
  return num.toLocaleString('en-US');
};

// format a list of strings as a single string with commas seperating the items
// or the string 'None' if the list is empty
export const formatListToString = (list: string[] | undefined) => {
  if (!list) return 'None';
  return list.join(', ');
};

// get the _page parameter from the url
export const getPageFromUrl = (url: string) => {
  const urlParams = new URLSearchParams(new URL(url).search);
  return urlParams.get('_page') || '';
};

// format the links header from the api response to a pagination object
export const formatLinksHeadersToPagination = (links: LinkHeader[]) => {
  console.log('links: ', links);
  const pagination: Pagination = { ...emptyPagination };

  links.forEach((link) => {
    console.log('link: ', getPageFromUrl(link.url));
    if (link.rel === 'first') {
      pagination.first = getPageFromUrl(link.url);
    } else if (link.rel === 'next') {
      pagination.next = getPageFromUrl(link.url);
    } else if (link.rel === 'last') {
      pagination.last = getPageFromUrl(link.url);
    }
  });

  return pagination;
};
