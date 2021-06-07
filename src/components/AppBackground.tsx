import React from 'react';
import {Image, ImageBackground, View} from 'react-native';
import {common} from 'src/styles';

const AppBackground: React.FC = ({children}) => (
  <ImageBackground
    style={common.styles.flex}
    source={require('../assets/images/bg_01.jpg')}>
    <View
      style={[common.styles.flex, {backgroundColor: 'rgba(0, 0, 0, 0.001)'}]}>
      {children}
    </View>
  </ImageBackground>
);

export default AppBackground;