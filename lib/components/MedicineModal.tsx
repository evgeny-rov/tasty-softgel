import React, {useState} from 'react';
import {DatePicker, Picker} from '@davidgovea/react-native-wheel-datepicker';
import {
  Button,
  Modal,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {CloseIcon} from './icons';
import SizedBox from './SizedBox';

interface Props {
  modalVisible: boolean;
  setVisibility: Function;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    borderTopLeftRadius: 30,
    borderTopEndRadius: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  section: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textWhite: {
    color: 'white',
    fontWeight: '700',
    fontSize: 20,
  },
  closebtn: {
    padding: 15,
    borderRadius: 100,
  },
});

const formstyles = StyleSheet.create({
  label: {
    fontWeight: '700',
    color: 'white',
  },
  input: {
    marginTop: 10,
    borderColor: '#fff',
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    color: '#fff',
  },
});

const dayHours = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
];

const MedicineModal: React.FC<Props> = ({modalVisible, setVisibility}) => {
  const [medicineData, setMedicineData] = useState({
    name: '',
    amount: '',
    hasRemindTime: false,
    remindTime: 12,
  });

  const changeMedicineData = (
    fieldName: keyof typeof medicineData,
    value: string | boolean | number,
  ) => {
    setMedicineData({...medicineData, [fieldName]: value});
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      style={{flex: 1}}
      onRequestClose={() => setVisibility(!modalVisible)}>
      <View style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.textWhite}>Новое лекарство</Text>
          <Pressable
            android_ripple={{radius: 20, color: 'gray'}}
            onPress={() => setVisibility(false)}
            style={styles.closebtn}>
            <CloseIcon fill="#fff" width={12} height={12} />
          </Pressable>
        </View>
        <SizedBox height={50} />
        <View style={styles.section}>
          <View style={{flex: 1}}>
            <Text style={formstyles.label}>Название:</Text>
            <TextInput
              style={formstyles.input}
              value={medicineData.name}
              onChangeText={(text) => changeMedicineData('name', text)}
            />
          </View>
        </View>
        <SizedBox height={50} />
        <View style={styles.section}>
          <Text style={formstyles.label}>Количество:</Text>
          <Text style={formstyles.label}>30</Text>
        </View>
        <SizedBox height={50} />
        <View style={styles.section}>
          <Text style={formstyles.label}>Напомнить</Text>
          <Switch
            value={medicineData.hasRemindTime}
            onValueChange={() =>
              changeMedicineData('hasRemindTime', !medicineData.hasRemindTime)
            }
          />
        </View>
        {medicineData.hasRemindTime && (
          <>
            <SizedBox height={30} />
            <View style={styles.section}>
              <Picker
                onValueChange={(val) => changeMedicineData('remindTime', val)}
                textColor={'white'}
                pickerData={dayHours}
                selectedValue={medicineData.remindTime}
                textSize={20}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0)',
                  flex: 1,
                  height: 100,
                }}
              />
            </View>
          </>
        )}
        <SizedBox height={50} />
        <View
          style={{
            ...styles.section,
            position: 'absolute',
            bottom: 90,
            right: 30,
          }}>
          <Pressable
            onPress={() => console.log(medicineData)}
            style={{
              // flex: 1,
              backgroundColor: 'rgba(255, 255, 255, 1)',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
              borderRadius: 50,
            }}>
            <Text style={{fontWeight: '700', color: 'black'}}>Сохранить</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default MedicineModal;
