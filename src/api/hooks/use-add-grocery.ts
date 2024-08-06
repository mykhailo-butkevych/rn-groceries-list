import {useMutation, useQueryClient} from '@tanstack/react-query';
import {addGrocery} from 'api/groceries';
import {Grocery} from 'types/groceries';

export const useAddGrocery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addGrocery,
    onMutate: async (newGrocery: Grocery) => {
      // Cancel any outgoing refetches so they don't overwrite optimistic update
      await queryClient.cancelQueries({queryKey: ['groceries']});

      // Snapshot the previous groceries data
      const previousGroceries: Grocery | undefined = queryClient.getQueryData([
        'groceries',
      ]);

      // Optimistically update to add the new grocery
      queryClient.setQueryData(
        ['groceries'],
        (old: {pages: {data: Grocery[]}[]} | undefined) => {
          if (!old) {
            return {pages: [{data: [newGrocery]}]};
          }

          // Add the new grocery to the first page
          const updatedFirstPage = {
            ...old.pages[0],
            data: [newGrocery, ...old.pages[0].data],
          };

          return {
            ...old,
            pages: [updatedFirstPage, ...old.pages.slice(1)],
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
