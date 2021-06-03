import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Modal from 'react-native-modal';

import {AppStateType} from 'src/types';
import {
  addMedicine,
  removeMedicine,
  updateMedicine,
} from 'src/redux/entities/medicines/medicines.actions';
import useModalMedicine from 'src/hooks/useModalMedicine';

import Icon from '@components/Icon';
import RepeatedActionButton from '@components/RepeatedActionButton';
import SizedBox from '@components/SizedBox';
import {common, theme, typography} from '@styles/';
import AmountCounter from './components/AmountCounter';

const MED_DEFAULT_NAME = '';
const MED_DEFAULT_COUNT = 30;

const ModalMedicineCardScreen = () => {
  const {isVisible, data: medicine} = useSelector(
    (state: AppStateType) => state.modal_medicine,
  );

  const dispatch = useDispatch();
  const {hideModalMedicine} = useModalMedicine();
  const [name, setName] = useState(MED_DEFAULT_NAME);
  const [count, setCount] = useState(MED_DEFAULT_COUNT);

  useEffect(() => {
    setName(medicine?.name ?? MED_DEFAULT_NAME);
    setCount(medicine?.count ?? MED_DEFAULT_COUNT);
  }, [isVisible]);

  const mode = medicine === null ? 'new' : 'update';

  const handleSubmit = () => {
    if (medicine !== null && mode === 'update') {
      dispatch(
        updateMedicine({
          ...medicine,
          name,
          count,
        }),
      );
    } else if (mode === 'new') {
      dispatch(
        addMedicine({
          name,
          count,
        }),
      );
    }

    hideModalMedicine();
  };

  const handleRemove = () => {
    if (medicine) {
      dispatch(removeMedicine({medicine}));
      hideModalMedicine();
    }
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
    <Modal
      swipeDirection="down"
      isVisible={isVisible}
      coverScreen={true}
      hasBackdrop={true}
      statusBarTranslucent
      style={styles.modal}
      useNativeDriverForBackdrop
      onSwipeComplete={hideModalMedicine}
      onBackButtonPress={hideModalMedicine}>
      <View style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.card_title} numberOfLines={1}>
            {titleText}
          </Text>
          <Pressable
            android_ripple={theme.configs.ripple_sm}
            style={styles.close_btn}
            onPress={hideModalMedicine}
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
            <AmountCounter count={count} setCount={setCount} />
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
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    marginHorizontal: 10,
    marginVertical: 0,
  },
  container: {
    flex: 1,
    padding: 30,
    borderTopLeftRadius: 30,
    borderTopEndRadius: 30,
    marginTop: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.384)',
  },
  section: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
