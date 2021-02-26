import React, {useState} from 'react';
import {Animated, Modal, Pressable, Switch, Text, View} from 'react-native';
import Picker from '@gregfrench/react-native-wheel-picker';
import {TextInput} from 'react-native-gesture-handler';
import {formStyles, textStyles, styles} from './styles';
import {CloseIcon} from '../icons';
import SizedBox from '../SizedBox';

interface Props {
  modalVisible: boolean;
  setVisibility: Function;
}

const HOURS_AS_STRING_ARRAY = new Array(24)
  .fill(null)
  .map((_, idx) => `${idx}:00`.padStart(5, '0'));

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

  const renderPicker = () => {
    return (
      <>
        <SizedBox height={50} />
        <Animated.View style={[styles.section, {alignItems: 'flex-start'}]}>
          <Text style={textStyles.h2}>Время напоминания:</Text>
          <Picker
            style={{width: 80, height: 100}}
            lineGradientColorFrom="#1a1a1a"
            lineGradientColorTo="#FFF"
            selectedValue={11}
            onValueChange={(value) => console.log(value)}>
            {HOURS_AS_STRING_ARRAY.map((value, idx) => (
              <Picker.Item label={value} value={idx} key={idx} />
            ))}
          </Picker>
        </Animated.View>
      </>
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setVisibility(!modalVisible)}>
      <View style={styles.container}>
        <View style={styles.section}>
          <Text style={textStyles.h1}>Новое лекарство</Text>
          <Pressable
            android_ripple={{radius: 20, color: 'gray'}}
            onPress={() => setVisibility(false)}
            style={styles.closebtn}>
            <CloseIcon fill="#fff" width={12} height={12} />
          </Pressable>
        </View>
        <SizedBox height={70} />
        <View style={styles.section}>
          <View style={{flex: 1}}>
            <Text style={textStyles.h2}>Название:</Text>
            <TextInput
              style={formStyles.input}
              value={medicineData.name}
              onChangeText={(text) => changeMedicineData('name', text)}
            />
          </View>
        </View>
        <SizedBox height={50} />
        <View style={styles.section}>
          <Text style={textStyles.h2}>Количество:</Text>
          <Text style={textStyles.h2}>30</Text>
        </View>
        <SizedBox height={50} />
        <View style={styles.section}>
          <Text style={textStyles.h2}>Включить напоминание</Text>
          <Switch
            value={medicineData.hasRemindTime}
            trackColor={{false: 'gray', true: 'gray'}}
            thumbColor="#b494ff"
            onValueChange={() => {
              changeMedicineData('hasRemindTime', !medicineData.hasRemindTime);
            }}
          />
        </View>
        {medicineData.hasRemindTime && renderPicker()}
        <SizedBox height={50} />
        <View style={styles.section}>
          <Pressable onPress={() => {}} style={formStyles.button}>
            <Text style={formStyles.buttonText}>Сохранить</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default MedicineModal;
