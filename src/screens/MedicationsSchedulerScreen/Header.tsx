import React from 'react';
import {View, Text} from 'react-native';
import {common, typography} from 'src/styles';

const Header = () => {
  return (
    <View style={common.styles.header}>
      <Text style={typography.styles.h1}>Часы приема</Text>
    </View>
  );
};

export default Header;
