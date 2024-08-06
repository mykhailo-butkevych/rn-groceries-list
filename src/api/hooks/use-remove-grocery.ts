import {useMutation, useQueryClient} from '@tanstack/react-query';
import {deleteGrocery} from 'api/groceries';
import {Grocery} from 'types/groceries';

export const useRemoveGrocery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteGrocery,
    onMutate: async (groceryId: string) => {
      // Cancel any outgoing refetches so they don't overwrite optimistic update
      await queryClient.cancelQueries({queryKey: ['groceries']});

      // Snapshot the previous groceries data
      const previousGroceries: Grocery | undefined = queryClient.getQueryData([
        'groceries',
      ]);

      // Optimistically update to remove the grocery
      queryClient.setQueryData(
        ['groceries'],
        (old: {pages: {data: Grocery[]}[]} | undefined) => {
          if (!old) {
            return {pages: []};
          }

          return {
            ...old,
            pages: old.pages.map(page => ({
              ...page,
              data: page.data.filter((item: Grocery) => item.id !== groceryId),
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
