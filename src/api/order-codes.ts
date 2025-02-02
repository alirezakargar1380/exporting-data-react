import useSWR, { mutate } from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios';
import { IOrderCode } from 'src/types/order-code';

// ----------------------------------------------------------------------

export function useGetOrderCodes() {
  const URL = '/api/order-codes/get/0/20000';

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const refresh = () => {
    mutate(URL);
  };

  const memoizedValue = useMemo(
    () => ({
      order_codes: (data as IOrderCode[])|| [],
      refresh,
      // profile_types: (data as IProductProfileType[]) || [],
      isLoading: isLoading,
      // productsError: error,
      // productsValidating: isValidating,
      // productsEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
