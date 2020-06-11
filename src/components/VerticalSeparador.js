import React from 'react';
import {View, StyleSheet} from 'react-native';

export default function VerticalSeparator (props) {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create ({
  separator: {
    borderTopWidth: 2,
    borderTopColor: '#000',
    marginHorizontal: 10,
  },
});
