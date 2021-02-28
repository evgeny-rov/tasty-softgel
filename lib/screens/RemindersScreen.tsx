import React from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  image: {flex: 1, justifyContent: 'center'},
  container: {flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.3)'},
});

const MedicineItem = () => {
  return null;
};

const RemindersScreen: React.FC = () => {
  return (
    <ImageBackground
      source={require('../assets/images/bg1.png')}
      style={styles.image}>
      <View style={styles.container}>
        <ScrollView></ScrollView>
      </View>
    </ImageBackground>
  );
};

export default RemindersScreen;
