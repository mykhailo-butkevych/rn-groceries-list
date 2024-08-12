import {GroceriesList} from 'components/groceries-list';
import React from 'react';
import {ViewStyle, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useGroceriesScreen} from './hooks';
import {GroceryModal} from 'components/grocery-modal';
import {AddGroceryButton} from 'components/add-grocery-button';
import {View} from '@gluestack-ui/themed';

export const GroceriesScreen = () => {
  const {
    flattenData,
    isFetching,
    isFetchingNextPage,
    isError,
    error,
    loadMoreGroceries,
    resetAndRefetch,
  } = useGroceriesScreen();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View
        flex={1}
        paddingHorizontal={30}
        paddingTop={15}
        gap={10}
        height="100%">
        <GroceriesList
          data={flattenData}
          isFetching={isFetching}
          isFetchingNextPage={isFetchingNextPage}
          isError={isError}
          error={error}
          onEndReached={loadMoreGroceries}
          onRefresh={resetAndRefetch}
        />
        <GroceryModal />
        <AddGroceryButton />
      </View>
    </SafeAreaView>
  );
};

type Style = {
  safeArea: ViewStyle;
};

const styles = StyleSheet.create<Style>({
  safeArea: {
    flex: 1,
  },
});
