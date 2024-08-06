import {useInfiniteQuery} from '@tanstack/react-query';
import {GroceriesApiResponse, getGroceries} from 'api/groceries';
import {Grocery} from 'types/groceries';

export const getReducedData = (data: any[]): Grocery[] => {
  return data.reduce<Grocery[]>((accumulator, current) => {
    return [...accumulator, ...current];
  }, []);
};

const getPageNumber = (lastPage: GroceriesApiResponse) => {
  const {pages, next} = lastPage;
  return next && next <= pages ? next : undefined;
};

export const useGetGroceries = (perPage: number = 10) => {
  const {data, ...rest} = useInfiniteQuery<GroceriesApiResponse>({
    queryKey: ['groceries'],
    initialPageParam: 1,
    queryFn: ({pageParam}) =>
      getGroceries({
        page: pageParam,
        per_page: perPage,
      }),
    getNextPageParam: lastPage => getPageNumber(lastPage),
  });

  return {
    data,
    ...rest,
  };
};
