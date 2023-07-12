import { getPageFromUrl, getLastPageFromLinksHeader, range } from '../helpers';

describe('range', () => {
  it('returns ["1"] for n <= 1', () => {
    expect(range(0)).toEqual(['1']);
    expect(range(1)).toEqual(['1']);
  });

  it('returns ["1"] for NaN', () => {
    expect(range(NaN)).toEqual(['1']);
  });

  it('returns a list of strings in the range [1, n] for n > 1', () => {
    expect(range(5)).toEqual(['1', '2', '3', '4', '5']);
  });
});

describe('getPageFromUrl', () => {
  it('returns the _page parameter from the url', () => {
    expect(getPageFromUrl('http://example.com?_page=3')).toBe('3');
  });

  it('returns an empty string if the _page parameter is not present', () => {
    expect(getPageFromUrl('http://example.com')).toBe('');
  });

  it('returns the _page parameter even if other parameters are present', () => {
    expect(getPageFromUrl('http://example.com?other_param=abc&_page=3')).toBe(
      '3',
    );
  });
});

describe('getLastPageFromLinksHeader', () => {
  it('returns the last page number from links', () => {
    const links = [
      { rel: 'first', url: 'https://example.com/api?_page=1' },
      { rel: 'next', url: 'https://example.com/api?_page=4' },
      { rel: 'last', url: 'https://example.com/api?_page=5' },
    ];

    const lastPage = getLastPageFromLinksHeader(links);

    expect(lastPage).toBe(5);
  });

  it('returns 1 when there is no last link', () => {
    const links = [
      { rel: 'first', url: 'https://example.com/api?_page=1' },
      { rel: 'next', url: 'https://example.com/api?_page=3' },
    ];

    const lastPage = getLastPageFromLinksHeader(links);

    expect(lastPage).toBe(1);
  });

  it('returns 1 when the last page is NaN', () => {
    const links = [
      { rel: 'first', url: 'https://example.com/api?_page=1' },
      { rel: 'last', url: 'https://example.com/api?_page=invalid' },
    ];

    const lastPage = getLastPageFromLinksHeader(links);

    expect(lastPage).toBe(1);
  });

  it('returns 1 when the last page is less than or equal to 1', () => {
    const links = [
      { rel: 'first', url: 'https://example.com/api?_page=1' },
      { rel: 'last', url: 'https://example.com/api?_page=0' },
    ];

    const lastPage = getLastPageFromLinksHeader(links);

    expect(lastPage).toBe(1);
  });
});
