import React, {useState} from 'react';
import Picker from '@gregfrench/react-native-wheel-picker';
import {StackNavigationHelpers} from '@react-navigation/stack/src/types';
import {Text, View} from 'react-native';
import globalStyles from '../../styles/global';
import BgImage from '../../components/BgImage';
import {styles} from './RemindersScreenStyles';
import hourToTimeString from '../../utils/hourToTimeString';

const HOURS_AS_STRING_ARRAY = Array(24)
  .fill(null)
  .map((_, idx) => hourToTimeString(idx));

interface Props {
  navigation: StackNavigationHelpers;
}

const RemindersScreen = ({navigation}: Props) => {
  const [selectedHour, setSelectedHour] = useState(12);

  return (
    <>
      <BgImage source={require('../../assets/images/bg1.png')} />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={globalStyles.h1}>Напоминания по часам</Text>
        </View>
        <View style={styles.pickerContainer}>
          <Picker
            style={{width: '100%', height: 100}}
            lineGradientColorFrom="#1a1a1a"
            lineGradientColorTo="#FFF"
            onTouchStart={() => console.log('touch')}
            selectedValue={selectedHour}
            onValueChange={(val) => setSelectedHour(val)}>
            {HOURS_AS_STRING_ARRAY.map((value, idx) => (
              <Picker.Item key={value} label={value} value={idx} />
            ))}
          </Picker>
        </View>
        <View style={styles.listContainer}></View>
      </View>
    </>
  );
};

export default RemindersScreen;
