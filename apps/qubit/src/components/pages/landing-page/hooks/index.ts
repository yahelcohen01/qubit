import { UseQueryResult } from '@tanstack/react-query';
import { useFetch } from '@utils';
import type { UpdatesRequest, UpdatesResponse } from '@types';

export const useGetUpdates = (
  params?: UpdatesRequest
): UseQueryResult<UpdatesResponse, Error> => {
  return useFetch<UpdatesRequest, UpdatesResponse>({
    queryKey: (p) => ['/updates', p],
    endpoint: '/updates',
    params,
  });
};
