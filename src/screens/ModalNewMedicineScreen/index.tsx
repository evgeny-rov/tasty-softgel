import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {StackNavigationHelpers} from '@react-navigation/stack/src/types';
import {useDispatch} from 'react-redux';

import {common, theme, typography} from '@styles/';
import RepeatedActionButton from '@components/RepeatedActionButton';
import SizedBox from '../../components/SizedBox';
import {addMedicine} from 'src/redux/entities/medicines/medicines.actions';
import {CloseIcon, ArrowIcon} from '@icons/';
import Icon from '@components/Icon';

interface Props {
  navigation: StackNavigationHelpers;
}

const ModalNewMedicineScreen = ({navigation}: Props) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(30);
  const dispatch = useDispatch();

  const goBack = () => setTimeout(() => navigation.goBack(), 0);

  const incrementAmount = () => setAmount(amount + 1);
  const decrementAmount = () => amount > 0 && setAmount(amount - 1);

  const handleSubmit = () => {
    const preparedNameData = name.trim();
    if (preparedNameData) {
      dispatch(addMedicine({name: preparedNameData, amount}));
      goBack();
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.section}>
          <Text style={typography.styles.h1}>Новое лекарство</Text>
          <Pressable
            android_ripple={theme.configs.ripple_sm}
            onPress={goBack}
            hitSlop={25}>
            <Icon name="clear" color={theme.colors.primary} size={20} />
          </Pressable>
        </View>
        <SizedBox height={60} />
        <View style={styles.section}>
          <View style={common.styles.flex}>
            <Text style={typography.styles.h2}>Наименование:</Text>
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
        <View style={styles.section}>
          <Text style={typography.styles.h2}>Количество:</Text>
          <View style={styles.section}>
            <RepeatedActionButton action={decrementAmount}>
              <Icon name="keyboard_arrow_left" color={theme.colors.primary} size={20} />
            </RepeatedActionButton>
            <Text style={[typography.styles.h2, styles.padded_amount]}>
              {amount}
            </Text>
            <RepeatedActionButton action={incrementAmount}>
            <Icon name="keyboard_arrow_right" color={theme.colors.primary} size={20} />
            </RepeatedActionButton>
          </View>
        </View>
        <View style={common.styles.flex_end}>
          <Pressable style={formStyles.button} onPress={handleSubmit}>
            <Text style={formStyles.buttonText}>Сохранить</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    borderTopLeftRadius: 30,
    borderTopEndRadius: 30,
    marginTop: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  section: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  padded_amount: {
    paddingHorizontal: 50,
  },
});

const formStyles = StyleSheet.create({
  input: {
    marginTop: 10,
    borderColor: theme.colors.primary,
    color: theme.colors.primary,
    padding: 5,
    borderBottomWidth: 1,
  },
  button: {
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 50,
  },
  buttonText: {
    fontWeight: '700',
    color: theme.colors.background,
  },
});

export default ModalNewMedicineScreen;
