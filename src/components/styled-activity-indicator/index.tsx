import {ActivityIndicator, StyleSheet, ViewStyle} from 'react-native';

export const StyledActivityIndicator = () => {
  return <ActivityIndicator color={'black'} style={styles.loader} />;
};

type Style = {
  loader: ViewStyle;
};

const styles = StyleSheet.create<Style>({
  loader: {
    paddingVertical: 10,
  },
});
