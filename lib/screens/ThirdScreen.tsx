import React from 'react';
import {ImageBackground, Text, View} from 'react-native';

const HomeScreen: React.FC = () => {
  return (
    <ImageBackground
      source={require('../assets/images/bg1.png')}
      style={{flex: 1, justifyContent: 'center'}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 32, fontWeight: '800', color: '#fff'}}>
          Hi From Screen 3
        </Text>
      </View>
    </ImageBackground>
  );
};

export default HomeScreen;
