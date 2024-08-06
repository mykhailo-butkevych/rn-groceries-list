import {useQueryClient} from '@tanstack/react-query';
import {useGetGroceries} from 'api/hooks/use-get-groceries';
import {useCallback} from 'react';

export const useGroceriesScreen = () => {
  const queryClient = useQueryClient();
  const {
    data,
    fetchNextPage,
    isFetching,
    hasNextPage,
    refetch,
    isError,
    error,
    isFetchingNextPage,
  } = useGetGroceries();

  const loadMoreGroceries = useCallback(async () => {
    if (!hasNextPage || isFetching) {
      return;
    }

    fetchNextPage();
  }, [hasNextPage, isFetching, fetchNextPage]);

  const resetAndRefetch = async () => {
    queryClient.removeQueries({queryKey: ['groceries']});
    refetch();
  };

  return {
    flattenData: data?.pages.flatMap(page => page.data) || [],
    isFetching,
    isFetchingNextPage,
    isError,
    error,
    loadMoreGroceries,
    resetAndRefetch,
  };
};
