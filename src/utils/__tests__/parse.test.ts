import { parseLinksHeader } from '../parse';

describe('parseLinksHeader', () => {
  test('should parse a valid link header with three links', () => {
    const input =
      'res <https://example.com/countries/?_page=1&_limit=20>; rel="first", <https://example.com/countries/?_page=2&_limit=20>; rel="next", <https://example.com/countries/?_page=13&_limit=20>; rel="last"';
    const output = [
      { rel: 'first', url: 'https://example.com/countries/?_page=1&_limit=20' },
      { rel: 'next', url: 'https://example.com/countries/?_page=2&_limit=20' },
      { rel: 'last', url: 'https://example.com/countries/?_page=13&_limit=20' },
    ];
    expect(parseLinksHeader(input)).toEqual(output);
  });

  test('should parse a valid link header with one link', () => {
    const input = 'res <https://example.com/countries/?_page=2>; rel="next"';
    const output = [
      { rel: 'next', url: 'https://example.com/countries/?_page=2' },
    ];
    expect(parseLinksHeader(input)).toEqual(output);
  });

  // test a link header with multiple rel parameters
  test('should ignore links with multiple rel parameters, only the first should be returned', () => {
    const input =
      '<https://example.com/countries/?_page=2>; rel="next"; rel="last"';
    const output = [
      { rel: 'next', url: 'https://example.com/countries/?_page=2' },
    ];
    expect(parseLinksHeader(input)).toEqual(output);
  });

  test('should return an empty array for an invalid link header with no links', () => {
    const input = '';
    const output: string[] = [];
    expect(parseLinksHeader(input)).toEqual(output);
  });

  test('should ignore links with missing rel or url', () => {
    const input =
      'res <https://example.com/countries/?_page=2&_limit=20>; rel="next", <https://example.com/countries/?_page=4&_limit=20>';
    const output = [
      { rel: 'next', url: 'https://example.com/countries/?_page=2&_limit=20' },
    ];

    expect(parseLinksHeader(input)).toEqual(output);
  });
});
