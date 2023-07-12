import { LinkHeader } from '@/types/types';

// parses Link headers from an HTTP response and returns them as a list of
// type LinkHeader. We assume that each Link only has one parameter rel
// even though the spec allows for multiple rel parameters.
export const parseLinksHeader = (linkHeader: string) => {
  const links = linkHeader.split(',');

  const linkHeaders: LinkHeader[] = links
    .map((link) => {
      const rel = checkRel(link);
      const url = checkUrl(link);
      if (url && rel)
        return {
          rel: rel,
          url: url,
        };
    })
    .filter(isNotNullorUnderfined);

  return linkHeaders;
};

const checkRegex = (regex: RegExp, link: string): string | null => {
  const match = link.match(regex);
  return match && match[1];
};

const checkUrl = (link: string): string | null => checkRegex(/<([^>]+)>/, link);
const checkRel = (link: string): string | null =>
  checkRegex(/rel="([^"]+)"/, link);

function isNotNullorUnderfined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}
