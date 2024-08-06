import {
  ButtonIcon,
  ButtonText,
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
  CheckIcon,
  Button,
  Text,
  EditIcon,
  View,
  TrashIcon,
} from '@gluestack-ui/themed';
import {useRemoveGrocery} from 'api/hooks/use-remove-grocery';
import {useUpdateGrocery} from 'api/hooks/use-update-grocery';
import {useSelectedGroceryStore} from 'hooks/zustand/use-selected-grocery';
import {Grocery} from 'types/groceries';

type Props = {
  data: Grocery;
};

export const GroceryItem = ({data}: Props) => {
  const {id, name, amount, isBought} = data;
  const setSelectedGrocery = useSelectedGroceryStore(
    state => state.setSelectedGrocery,
  );
  const {mutate: updateGrocery} = useUpdateGrocery();
  const {mutate: removeGrocery} = useRemoveGrocery();

  const handleToggle = () => {
    updateGrocery({...data, isBought: !data.isBought});
  };

  const handleRemove = (groceryId: string) => {
    removeGrocery(groceryId);
  };

  return (
    <View
      flex={1}
      borderRadius={4}
      borderWidth={2}
      borderColor="$black"
      marginVertical={10}>
      <View padding={10} gap="$4">
        <View flexDirection="row" justifyContent="space-between">
          <View gap="$1" flex={1}>
            <Text
              color="$black"
              fontSize={16}
              bold
              textDecorationLine={isBought ? 'line-through' : 'none'}
              numberOfLines={1}
              ellipsizeMode="tail"
              max-width={200}>
              ID: {id}
            </Text>
            <Text
              color="$black"
              fontSize={16}
              bold
              textDecorationLine={isBought ? 'line-through' : 'none'}
              numberOfLines={1}
              ellipsizeMode="tail">
              Name: {name}
            </Text>
            <Text
              color="$black"
              fontSize={16}
              bold
              textDecorationLine={isBought ? 'line-through' : 'none'}
              numberOfLines={1}
              ellipsizeMode="tail">
              Amount: {amount}
            </Text>
          </View>
          <Checkbox
            alignSelf="flex-start"
            value="isBought"
            isChecked={isBought}
            size="lg"
            aria-label="Checkbox"
            onPress={handleToggle}>
            <CheckboxIndicator mr="$2">
              <CheckboxIcon as={CheckIcon} color="$white" />
            </CheckboxIndicator>
            <CheckboxLabel>Buy</CheckboxLabel>
          </Checkbox>
        </View>
        <View flexDirection="row" justifyContent="space-between">
          <Button
            size="md"
            variant="solid"
            action="negative"
            gap={'$2'}
            w="40%"
            isDisabled={isBought}
            onPress={() => handleRemove(data.id)}>
            <ButtonText>Remove</ButtonText>
            <ButtonIcon as={TrashIcon} />
          </Button>
          <Button
            size="md"
            variant="solid"
            action="primary"
            w="40%"
            gap={'$2'}
            isDisabled={isBought}
            onPress={() => setSelectedGrocery(data, 'edit')}>
            <ButtonText>Edit</ButtonText>
            <ButtonIcon as={EditIcon} />
          </Button>
        </View>
      </View>
    </View>
  );
};
