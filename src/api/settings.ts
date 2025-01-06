import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios';
import { IOrderCode } from 'src/types/order-code';
import { ISettings } from 'src/types/settings';

// ----------------------------------------------------------------------

export function useGetSettings() {
  const URL = '/api/settings';

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      settings: (data as ISettings)|| {}
      // profile_types: (data as IProductProfileType[]) || [],
      // productsLoading: isLoading,
      // productsError: error,
      // productsValidating: isValidating,
      // productsEmpty: !isLoading && !data?.length,
    }),
    [data, data?.stop_bot_request, error, isLoading, isValidating]
  );

  return memoizedValue;
}