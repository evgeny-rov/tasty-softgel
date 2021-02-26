import React, {useState} from 'react';
import {Button, ImageBackground, StyleSheet} from 'react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {Card} from '../components/Card';
import SizedBox from '../components/SizedBox';

const PillForm: React.FC = () => {
  const [pillData, setPillData] = useState({
    name: '',
    amount: '',
    remindTime: '',
  });

  return (
    <Card customStyles={styles.wrapper}>
      <TextInput
        onChangeText={(text) => setPillData({...pillData, name: text})}
        placeholder="Type in Pill name"
        placeholderTextColor="#aaaaaa"
        style={styles.inputfield}
      />
      <TextInput
        onChangeText={(text) => setPillData({...pillData, amount: text})}
        placeholder="Amount"
        placeholderTextColor="#aaaaaa"
        keyboardType="numeric"
        style={styles.inputfield}
      />
      <TextInput
        onChangeText={(text) => setPillData({...pillData, remindTime: text})}
        placeholder="Remind time"
        placeholderTextColor="#aaaaaa"
        keyboardType="numbers-and-punctuation"
        style={styles.inputfield}
      />
      <Button title="Add pill" onPress={() => console.log(pillData)} />
    </Card>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'space-between',
    height: 700,
  },
  inputfield: {
    padding: 15,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 3,
    color: 'white',
    borderRadius: 10,
  },
});

const SecondScreen: React.FC = () => {
  return (
    <ImageBackground
      source={require('../assets/images/bg1.png')}
      style={{flex: 1, justifyContent: 'center'}}>
      <ScrollView>
        <SizedBox height={20} />
        <PillForm />
        <SizedBox height={10} />
      </ScrollView>
    </ImageBackground>
  );
};

export default SecondScreen;
