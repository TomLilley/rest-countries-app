/**
 * @jest-environment jsdom
 */

import 'whatwg-fetch';
import { renderHook } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import { act } from 'react-test-renderer';
import useCountries from '@/hooks/useCountries';
import { API_URL } from '@/constants/constants';
import { Region } from '@/types/types';

describe('useCountry', () => {
  beforeAll(() => {
    global.fetch = fetch;
  });
  afterEach(() => {
    fetchMock.restore();
  });

  it('should return countries list with a successful api request', async () => {
    fetchMock.mock(`${API_URL}?q=bang&region=Asia&_limit=20&_page=1`, [
      {
        name: 'Bangladesh',
        alpha3Code: 'BGD',
        // other country properties...
      },
      {
        name: 'Thailand',
        alpha3Code: 'THA',
        // other country properties...
      },
    ]);

    let hookResult: any;
    await act(async () => {
      hookResult = renderHook(() => useCountries('bang', Region['Asia'], 1));
    });

    // Check the 'countriesList' state variable has the correct data
    expect(hookResult.result.current.countriesList).toHaveLength(2);
    expect(hookResult.result.current.countriesList[0].name).toBe('Bangladesh');
    expect(hookResult.result.current.countriesList[1].name).toBe('Thailand');

    // Check the page state variable is set correctly
    expect(hookResult.result.current.lastPage).toBe(1);
  });

  it('should set lastPage state correctly based on Link header', async () => {
    fetchMock.mock(`${API_URL}?_limit=20&_page=1`, {
      body: [
        {
          name: 'Thailand',
        },
      ],
      headers: {
        Link: '<http://rest-countries-server.vercel.app/countries/?_page=1&_limit=20>; rel="first", <http://rest-countries-server.vercel.app/countries/?_page=2&_limit=20>; rel="next", <http://rest-countries-server.vercel.app/countries/?_page=13&_limit=20>; rel="last"',
      },
    });

    let hookResult: any;
    await act(async () => {
      hookResult = renderHook(() => useCountries('', undefined, 1));
    });

    // Check the 'lastPage' state variable is set correctly
    expect(hookResult.result.current.lastPage).toBe(13);
  });

  it('should make correct API call when only search is provided', async () => {
    fetchMock.mock(`${API_URL}?q=test&_limit=20&_page=1`, [
      {
        name: 'Country1',
      },
    ]);

    let hookResult: any;
    await act(async () => {
      hookResult = renderHook(() => useCountries('test'));
    });

    // Check the 'countriesList' state variable has the correct data
    expect(hookResult.result.current.countriesList).toHaveLength(1);
    expect(hookResult.result.current.countriesList[0].name).toBe('Country1');
  });

  it('should make correct API call when only region is provided', async () => {
    fetchMock.mock(`${API_URL}?region=Europe&_limit=20&_page=1`, [
      {
        name: 'Country1',
        // other country properties...
      },
    ]);

    let hookResult: any;
    await act(async () => {
      hookResult = renderHook(() => useCountries(undefined, Region['Europe']));
    });

    // Check the 'countriesList' state variable has the correct data
    expect(hookResult.result.current.countriesList).toHaveLength(1);
    expect(hookResult.result.current.countriesList[0].name).toBe('Country1');
  });

  it('should make correct API call when no parameters are provided', async () => {
    fetchMock.mock(`${API_URL}?_limit=20&_page=1`, [
      {
        name: 'Country1',
        // other country properties...
      },
    ]);

    let hookResult: any;
    await act(async () => {
      hookResult = renderHook(() => useCountries());
    });

    // Check the 'countriesList' state variable has the correct data
    expect(hookResult.result.current.countriesList).toHaveLength(1);
    expect(hookResult.result.current.countriesList[0].name).toBe('Country1');
  });
});
