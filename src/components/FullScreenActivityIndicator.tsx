import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {common} from '@styles/';

const FullScreenActivityIndicator = () => {
  return (
    <View style={[common.styles.centered, common.styles.absolutely_full]}>
      <ActivityIndicator color="#fff" size="large" />
    </View>
  );
};

export default FullScreenActivityIndicator;
