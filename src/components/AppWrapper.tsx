import React from 'react';
import {ImageBackground, View} from 'react-native';
import {common} from 'src/styles';

const AppWrapper: React.FC = ({children}) => (
  <ImageBackground
    style={common.styles.flex}
    source={require('../assets/images/bg_01.jpg')}>
    <View
      style={[common.styles.flex, {backgroundColor: 'rgba(0, 0, 0, 0.01)'}]}>
      {children}
    </View>
  </ImageBackground>
);

export default AppWrapper;