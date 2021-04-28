import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {StackNavigationHelpers} from '@react-navigation/stack/src/types';
import {useDispatch} from 'react-redux';

import {common, theme, typography} from '@styles/';
import RepeatedActionButton from '@components/RepeatedActionButton';
import SizedBox from '../../components/SizedBox';
import {
  addMedicine,
  updateMedicine,
} from 'src/redux/entities/medicines/medicines.actions';
import Icon from '@components/Icon';
import {RouteProp} from '@react-navigation/native';
import {Medicine} from 'src/types';

type RootStackParamList = {
  modal_medicine_card: {
    medicine: Medicine;
  };
};

interface Props {
  navigation: StackNavigationHelpers;
  route: RouteProp<RootStackParamList, 'modal_medicine_card'>;
}

const ModalEditMedicineScreen = ({navigation, route}: Props) => {
  const {medicine} = route.params;
  const [name, setName] = useState(medicine.name);
  const [initialAmount, setInitialAmount] = useState(medicine.initialAmount);
  const [currentAmount, setCurrentAmount] = useState(medicine.currentAmount);
  const [showInitialAmount, setShowInitialAmount] = useState(false);
  const dispatch = useDispatch();

  const closeScreen = () => setTimeout(() => navigation.goBack(), 0);

  const incrementAmount = () => {
    if (showInitialAmount) {
      setInitialAmount(initialAmount + 1);
    } else {
      setCurrentAmount(currentAmount + 1);
    }
  };

  const decrementAmount = () => {
    if (showInitialAmount) {
      initialAmount > 0 && setInitialAmount(initialAmount - 1);
    } else {
      currentAmount > 0 && setCurrentAmount(currentAmount - 1);
    }
  };

  const handleSubmit = () => {
    const preparedNameData = name.trim();
    if (preparedNameData) {
      dispatch(
        updateMedicine({
          ...medicine,
          name,
          initialAmount,
          currentAmount,
        }),
      );
      closeScreen();
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.section}>
          <Text style={typography.styles.h1}>Новое лекарство</Text>
          <Pressable
            android_ripple={theme.configs.ripple_sm}
            onPress={closeScreen}
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
        <View style={{flexDirection: 'row'}}>
          <Pressable onPress={() => setShowInitialAmount(false)}>
            <Text
              style={[
                typography.styles.h2,
                {
                  color: showInitialAmount
                    ? theme.colors.secondary_dark
                    : theme.colors.primary,
                },
              ]}>
              Текущее
            </Text>
          </Pressable>
          <SizedBox width={20} />
          <Pressable onPress={() => setShowInitialAmount(true)}>
            <Text
              style={[
                typography.styles.h2,
                {
                  color: showInitialAmount
                    ? theme.colors.primary
                    : theme.colors.secondary_dark,
                },
              ]}>
              Общее
            </Text>
          </Pressable>
        </View>
        <SizedBox height={30} />
        <View style={styles.section}>
          <Text style={typography.styles.h2}>Количество:</Text>
          <View style={styles.section}>
            <RepeatedActionButton action={decrementAmount}>
              <Icon
                name="keyboard_arrow_left"
                color={theme.colors.primary}
                size={20}
              />
            </RepeatedActionButton>
            <Text style={[typography.styles.h2, styles.padded_amount]}>
              {showInitialAmount ? initialAmount : currentAmount}
            </Text>
            <RepeatedActionButton action={incrementAmount}>
              <Icon
                name="keyboard_arrow_right"
                color={theme.colors.primary}
                size={20}
              />
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

export default ModalEditMedicineScreen;
