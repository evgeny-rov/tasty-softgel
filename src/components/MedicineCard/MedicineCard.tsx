import React, {useState} from 'react';
import {Modal, Pressable, StyleSheet, Switch, Text, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {Medicine, medicineActions} from '../../redux';

import generalStyles from '../../styles/global';
import {formStyles, styles} from './MedicineCardStyles';
import {ArrowIcon, CloseIcon} from '../icons';
import SizedBox from '../SizedBox';

interface Props {
  title: string;
  data?: Medicine;
  mode: 'update' | 'add';
  modalVisible: boolean;
  setVisibility: Function;
}

const MedicineModal: React.FC<Props> = ({
  modalVisible,
  setVisibility,
  data,
}) => {
  const dispatch = useDispatch();
  const [medicineName, setMedicineName] = useState(data?.name ?? '');
  const [medicineCurrentAmount, setMedicineCurrentAmount] = useState(
    data?.currentAmount ?? 30,
  );
  const [medicineInitialAmount, setMedicineInitialAmount] = useState(
    data?.initialAmount ?? 30,
  );

  const handleSubmit = () => {
    if (medicineName.trim()) {
      const preparedMedicineData = {
        name: medicineName,
        currentAmount: medicineCurrentAmount,
        initialAmount: medicineInitialAmount,
      };
      dispatch(medicineActions.addMedicine(preparedMedicineData));
      setMedicineName('');
      setMedicineCurrentAmount(30);
      setMedicineInitialAmount(30);
      setVisibility(false);
    }
  };

  return (
    <Modal
      animationType="slide"
      visible={modalVisible}
      transparent={true}
      onRequestClose={() => setVisibility(!modalVisible)}>
      <View style={styles.container}>
        <View style={[generalStyles.row, styles.section]}>
          <Text style={generalStyles.h1}>Новое лекарство</Text>
          <Pressable
            android_ripple={{radius: 20, color: 'gray'}}
            onPress={() => setVisibility(false)}
            style={styles.closebtn}>
            <CloseIcon fill="#fff" width={12} height={12} />
          </Pressable>
        </View>
        <SizedBox height={60} />
        <View style={[generalStyles.row, styles.section]}>
          <View style={generalStyles.flex}>
            <Text style={generalStyles.h2}>Наименование:</Text>
            <TextInput
              style={formStyles.input}
              autoCapitalize="words"
              value={medicineName}
              onChangeText={setMedicineName}
              blurOnSubmit
            />
          </View>
        </View>
        <SizedBox height={50} />
        <View
          style={[generalStyles.row, styles.section, {alignItems: 'center'}]}>
          <Text style={generalStyles.h2}>Количество:</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Pressable
              style={{
                padding: 15,
                borderRadius: 100,
              }}
              android_ripple={{radius: 15, color: 'gray'}}
              onPress={() =>
                setMedicineInitialAmount(medicineInitialAmount - 1)
              }>
              <ArrowIcon fill="white" rotation={180} />
            </Pressable>
            <Text style={[generalStyles.h2, {paddingHorizontal: 40}]}>
              {medicineInitialAmount}
            </Text>
            <Pressable
              style={{
                padding: 15,
                borderRadius: 100,
              }}
              android_ripple={{radius: 15, color: 'gray'}}
              onPress={() =>
                setMedicineInitialAmount(medicineInitialAmount + 1)
              }>
              <ArrowIcon fill="white" />
            </Pressable>
          </View>
        </View>
        <View
          style={[
            styles.section,
            {
              alignSelf: 'flex-end',
              justifyContent: 'flex-end',
              flex: 1,
            },
          ]}>
          <Pressable onPress={handleSubmit} style={formStyles.button}>
            <Text style={formStyles.buttonText}>Сохранить</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default MedicineModal;

/*
const Clicker = () => {
    const [amount, setAmount] = useState(30);
    const [pressedIn, setPressedIn] = useState(false);

    useEffect(() => {
      setTimeout(() => {
        setAmount(amount + 1);
      }, 0);
    }, []);

    const changeAmount = () => {
      setPressedIn(true);
    };

    return (
      <View style={[styles.section]}>
        <Text style={generalStyles.h2}>Количество:</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Pressable
            android_ripple={{radius: 10, color: 'gray'}}
            style={[styles.closebtn, {paddingHorizontal: 40}]}
            onPressIn={() => changeAmount()}
            onPressOut={() => setPressedIn(false)}>
            <ArrowIcon fill="white" rotation={180} />
          </Pressable>
          <Text style={generalStyles.h2}>{amount}</Text>
          <Pressable
            android_ripple={{radius: 10, color: 'gray'}}
            style={[styles.closebtn, {paddingHorizontal: 40}]}
            onPressIn={() => changeAmount()}
            onPressOut={() => setPressedIn(false)}>
            <ArrowIcon fill="white" />
          </Pressable>
        </View>
      </View>
    );
  };


  const renderPicker = () => {
    return (
      <>
        <SizedBox height={50} />
        <View style={[styles.section]}>
          <Text style={generalStyles.h2}>Время напоминания:</Text>
          <Picker
            style={styles.picker}
            lineGradientColorFrom="#1a1a1a"
            lineGradientColorTo="#FFF"
            selectedValue={medicineReminderHour}
            onValueChange={setMedicineReminderHour}>
            {HOURS_AS_STRING_ARRAY.map((value, idx) => (
              <Picker.Item key={value} label={value} value={idx} />
            ))}
          </Picker>
        </View>
      </>
    );
  };

  <View style={[styles.section]}>
          <Text style={generalStyles.h2}>Включить напоминание</Text>
          <Switch
            value={medicineReminderEnabled}
            trackColor={{false: 'gray', true: 'gray'}}
            thumbColor="#b4a2dd"
            onValueChange={() =>
              setMedicineReminderEnabled(!medicineReminderEnabled)
            }
          />
        </View>
  */
