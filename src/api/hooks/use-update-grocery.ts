import {useMutation, useQueryClient} from '@tanstack/react-query';
import {updateGrocery} from 'api/groceries';
import {Grocery} from 'types/groceries';

export const useUpdateGrocery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateGrocery,
    onMutate: async (updatedGrocery: Grocery) => {
      // Cancel any outgoing refetches so they don't overwrite optimistic update
      await queryClient.cancelQueries({queryKey: ['groceries']});

      // Snapshot the previous groceries data
      const previousGroceries: Grocery | undefined = queryClient.getQueryData([
        'groceries',
      ]);

      // Optimistically update to the new value
      queryClient.setQueryData(
        ['groceries'],
        (old: {pages: {data: Grocery[]}[]}) => {
          if (!old) {
            return {pages: [{data: [updatedGrocery]}]};
          }

          return {
            ...old,
            pages: old.pages.map((page: any) => ({
              ...page,
              data: page.data.map((item: Grocery) =>
                item.id === updatedGrocery.id
                  ? {...item, ...updatedGrocery}
                  : item,
              ),
            })),
          };
        },
      );

      return {previousGroceries};
    },
    onError: (
      _,
      __,
      context: {previousGroceries: Grocery | undefined} | undefined,
    ) => {
      if (context?.previousGroceries) {
        queryClient.setQueryData(['groceries'], context.previousGroceries);
      }
    },
    onSettled: () => {
      // Ensure data is in sync with server
      queryClient.invalidateQueries({queryKey: ['groceries']});
    },
  });
};
