import {
  Button,
  ButtonText,
  Text,
  View,
  RefreshControl,
} from '@gluestack-ui/themed';
import {FlashList} from '@shopify/flash-list';
import {EmptyList} from 'components/empty-list';
import {GroceryItem} from 'components/grocery-item';
import {StyledActivityIndicator} from 'components/styled-activity-indicator';
import {Grocery} from 'types/groceries';

const keyExtractor = (item: Grocery, index: number) => `${index}-${item.id}`;

const renderItem = ({item}: {item: Grocery}) => <GroceryItem data={item} />;

const CustomEmptyList = () => (
  <EmptyList message="No groceries found, try adding a new one!" />
);

type Props = {
  data: Grocery[];
  isFetching: boolean;
  isFetchingNextPage: boolean;
  isError: boolean;
  error: Error | null;
  onEndReached: () => void;
  onRefresh: () => void;
};

export const GroceriesList = ({
  data,
  isFetching,
  isFetchingNextPage,
  isError,
  error,
  onEndReached,
  onRefresh,
}: Props) => {
  if (isError) {
    return (
      <View flex={1} justifyContent="center" alignItems="center">
        {error?.message && (
          <View>
            <Text bold>Fetching Groceries Error:</Text>
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
    <View height="100%">
      <FlashList
        data={data}
        keyExtractor={keyExtractor}
        estimatedItemSize={150}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={onRefresh}
            tintColor="black"
          />
        }
        ListFooterComponent={
          isFetchingNextPage ? StyledActivityIndicator : null
        }
        ListEmptyComponent={isFetching ? null : CustomEmptyList}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.2}
      />
    </View>
  );
};
