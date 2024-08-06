import {View} from '@gluestack-ui/themed';
import {RecentlyBoughtList} from 'components/recently-bought-list';
import {ViewStyle, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useGroceriesScreen} from 'screens/groceries/hooks';

export const RecentlyBoughtScreen = () => {
  const {flattenData, isError, error, resetAndRefetch} = useGroceriesScreen();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View flex={1} paddingHorizontal={30} paddingVertical={15} height="100%">
        <RecentlyBoughtList
          data={flattenData.filter(item => item.isBought)}
          isError={isError}
          error={error}
          onRefresh={resetAndRefetch}
        />
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
