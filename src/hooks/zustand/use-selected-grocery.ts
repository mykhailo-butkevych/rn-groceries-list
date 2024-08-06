import {Grocery} from 'types/groceries';
import {create} from 'zustand';

type ActionType = 'add' | 'edit' | null;

type State = {
  selectedGrocery: Grocery | null;
  actionType: ActionType | null;
  setSelectedGrocery: (value: Grocery | null, actionType?: ActionType) => void;
};

export const useSelectedGroceryStore = create<State>(set => ({
  selectedGrocery: null,
  actionType: null,
  setSelectedGrocery: (value: Grocery | null, actionType?: ActionType) =>
    set({selectedGrocery: value, actionType: actionType || null}),
}));
