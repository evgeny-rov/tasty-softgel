import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {StackNavigationHelpers} from '@react-navigation/stack/src/types';
import {useDispatch} from 'react-redux';

import {common, theme, typography} from '@styles/';
import RepeatedActionButton from '@components/RepeatedActionButton';
import SizedBox from '../../components/SizedBox';
import {
  addMedicine,
  removeMedicine,
  updateMedicine,
} from 'src/redux/entities/medicines/medicines.actions';
import Icon from '@components/Icon';
import {RouteProp} from '@react-navigation/native';
import {Medicine} from 'src/types';

type RootStackParamList = {
  modal_medicine_card: {
    medicine: Medicine;
    mode: 'new' | 'update';
  };
};

interface Props {
  navigation: StackNavigationHelpers;
  route: RouteProp<RootStackParamList, 'modal_medicine_card'>;
}

const ModalMedicineCardScreen = ({navigation, route}: Props) => {
  const {mode, medicine} = route.params;
  const [name, setName] = useState(medicine?.name || '');
  const [count, setCount] = useState(medicine?.count || 30);
  const dispatch = useDispatch();

  const closeScreen = () => setTimeout(() => navigation.goBack(), 0);

  const incrementCount = () => setCount(count + 1);
  const decrementCount = () => count > 0 && setCount(count - 1);

  const handleSubmit = () => {
    switch (mode) {
      case 'new': {
        dispatch(
          addMedicine({
            name,
            count,
          }),
        );
      }
      case 'update': {
        dispatch(
          updateMedicine({
            ...medicine,
            name,
            count,
          }),
        );
      }
    }
    closeScreen();
  };

  const handleRemove = () => {
    closeScreen();
    dispatch(removeMedicine({medicine}));
  };

  const titleText = mode === 'new' ? 'Новое лекарство' : name;

  const removeButton = mode === 'update' && (
    <Pressable style={formStyles.button} onPress={handleRemove}>
      <Text style={[formStyles.buttonText, {color: theme.colors.attention}]}>
        Удалить
      </Text>
    </Pressable>
  );

  return (
    <>
      <View style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.card_title} numberOfLines={1}>
            {titleText}
          </Text>
          <Pressable
            android_ripple={theme.configs.ripple_sm}
            style={styles.close_btn}
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
              // onSubmitEditing={handleSubmit}
              blurOnSubmit
            />
          </View>
        </View>
        <SizedBox height={50} />
        <View style={styles.section}>
          <Text style={typography.styles.h2}>Количество:</Text>
          <View style={styles.section}>
            <RepeatedActionButton action={decrementCount}>
              <Icon
                name="keyboard_arrow_left"
                color={theme.colors.primary}
                size={20}
              />
            </RepeatedActionButton>
            <Text style={[typography.styles.h2, styles.padded_amount]}>
              {count}
            </Text>
            <RepeatedActionButton action={incrementCount}>
              <Icon
                name="keyboard_arrow_right"
                color={theme.colors.primary}
                size={20}
              />
            </RepeatedActionButton>
          </View>
        </View>
        <View style={formStyles.button_container}>
          {removeButton}
          <Pressable
            style={formStyles.button}
            disabled={name.trim().length < 1}
            onPress={handleSubmit}
            android_ripple={theme.configs.ripple_xl}>
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
    backgroundColor: 'rgba(76, 64, 94, 0.95)',
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
  close_btn: {
    marginLeft: 20,
  },
  card_title: {...typography.styles.h1, flex: 1},
});

const formStyles = StyleSheet.create({
  input: {
    marginTop: 10,
    borderColor: theme.colors.primary,
    color: theme.colors.primary,
    padding: 5,
    borderBottomWidth: 1,
  },
  button_container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-evenly',
  },
  button: {
    // backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    // borderRadius: 50,
  },
  buttonText: {
    fontWeight: '700',
    color: theme.colors.primary,
  },
});

export default ModalMedicineCardScreen;
