import React, {useState} from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import {StackNavigationHelpers} from '@react-navigation/stack/src/types';
import {useDispatch} from 'react-redux';
import {addMedicine} from '../../redux/actions/actions';

import RepeatingButton from '../../components/RepeatingButton';
import SizedBox from '../../components/SizedBox';
import {CloseIcon, ArrowIcon} from '../../Icons';
import globalStyles, {androidRipple} from '../../styles/global';
import {formStyles, styles} from './MedicineModalScreenStyles';

interface Props {
  navigation: StackNavigationHelpers;
}

const MedicineModalScreen = ({navigation}: Props) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(30);
  const dispatch = useDispatch();

  const goBack = () => setTimeout(() => navigation.goBack(), 0);

  const incrementAmount = () => setAmount(amount + 1);
  const decrementAmount = () => amount > 0 && setAmount(amount - 1);

  const handleSubmit = () => {
    if (name.trim()) {
      dispatch(addMedicine({name, amount}));
      goBack();
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View
          style={[globalStyles.row, styles.section, styles.centeredVertically]}>
          <Text style={globalStyles.h1}>Новое лекарство</Text>
          <Pressable
            android_ripple={androidRipple}
            onPress={goBack}
            hitSlop={25}>
            <CloseIcon fill="#fff" width={12} height={12} />
          </Pressable>
        </View>
        <SizedBox height={60} />
        <View style={[globalStyles.row, styles.section]}>
          <View style={globalStyles.flex}>
            <Text style={globalStyles.h2}>Наименование:</Text>
            <TextInput
              style={formStyles.input}
              autoCapitalize="words"
              value={name}
              onChangeText={setName}
              blurOnSubmit
            />
          </View>
        </View>
        <SizedBox height={50} />
        <View
          style={[globalStyles.row, styles.section, styles.centeredVertically]}>
          <Text style={globalStyles.h2}>Количество:</Text>
          <View style={[globalStyles.row, styles.centeredVertically]}>
            <RepeatingButton action={decrementAmount}>
              <ArrowIcon fill="white" rotation={180} />
            </RepeatingButton>
            <Text style={[globalStyles.h2, styles.amountPad]}>{amount}</Text>
            <RepeatingButton action={incrementAmount}>
              <ArrowIcon fill="white" />
            </RepeatingButton>
          </View>
        </View>
        <View style={[styles.section, globalStyles.flex, styles.flex_end]}>
          <Pressable style={formStyles.button} onPress={handleSubmit}>
            <Text style={formStyles.buttonText}>Сохранить</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};

export default MedicineModalScreen;
