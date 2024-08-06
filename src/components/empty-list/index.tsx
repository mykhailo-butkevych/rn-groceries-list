import {Text, View} from '@gluestack-ui/themed';
import React from 'react';
import {Dimensions} from 'react-native';

type Props = {
  message: string;
};

const {height} = Dimensions.get('window');

export const EmptyList = ({message}: Props) => {
  return (
    <View height={height} alignItems="center" justifyContent="center">
      <Text color="$black" textAlign="center" bold>
        {message}
      </Text>
    </View>
  );
};
