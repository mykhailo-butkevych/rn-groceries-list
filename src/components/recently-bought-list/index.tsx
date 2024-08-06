import {Button, ButtonText, Text, View} from '@gluestack-ui/themed';
import {FlashList} from '@shopify/flash-list';
import {EmptyList} from 'components/empty-list';
import {GroceryItem} from 'components/grocery-item';
import {Grocery} from 'types/groceries';

const keyExtractor = (item: Grocery, index: number) => `${index}-${item.id}`;

const renderItem = ({item}: {item: Grocery}) => <GroceryItem data={item} />;

const CustomEmptyList = () => (
  <EmptyList message="No bought groceries found, try buying some!" />
);

type Props = {
  data: Grocery[];
  isError: boolean;
  error: Error | null;
  onRefresh: () => void;
};

export const RecentlyBoughtList = ({
  data,
  isError,
  error,
  onRefresh,
}: Props) => {
  if (isError) {
    return (
      <View flex={1} height="100%" justifyContent="center" alignItems="center">
        {error?.message && (
          <View>
            <Text bold>Fetching Recently Bought Groceries Error:</Text>
            <Text>{error.message}</Text>
          </View>
        )}
        <Button size="md" variant="solid" action="primary" onPress={onRefresh}>
          <ButtonText>Retry</ButtonText>
        </Button>
      </View>
    );
  }

  return (
    <FlashList
      data={data}
      keyExtractor={keyExtractor}
      estimatedItemSize={150}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      renderItem={renderItem}
      ListEmptyComponent={CustomEmptyList}
    />
  );
};
