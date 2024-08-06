import {AddIcon, Button, ButtonIcon, ButtonText} from '@gluestack-ui/themed';
import {useSelectedGroceryStore} from 'hooks/zustand/use-selected-grocery';

export const AddGroceryButton = () => {
  const setSelectedGrocery = useSelectedGroceryStore(
    state => state.setSelectedGrocery,
  );

  const handleAdd = () => {
    setSelectedGrocery(null, 'add');
  };

  return (
    <Button
      gap="$2"
      position="absolute"
      bottom={20}
      right={20}
      variant="solid"
      action="primary"
      onPress={handleAdd}>
      <ButtonText>Add</ButtonText>
      <ButtonIcon as={AddIcon} />
    </Button>
  );
};
