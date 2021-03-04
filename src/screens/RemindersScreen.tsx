import Picker from '@gregfrench/react-native-wheel-picker';
import React, {useState} from 'react';
import {
  ImageBackground,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {BellIcon} from '../components/icons';
import {AppState, Medicine, medicineActions, selectByTime} from '../redux';
import generalStyles from '../styles/global';
import hourToString from '../utils/hourToTimeString';

const HOURS_AS_STRING_ARRAY = Array(24)
  .fill(null)
  .map((_, idx) => hourToString(idx));

const medicineListStyles = StyleSheet.create({
  title: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
  subtitle: {
    color: 'grey',
    fontWeight: '500',
    fontSize: 12,
  },
  reminderTime: {
    color: 'white',
    fontWeight: '700',
    fontSize: 14,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 0,
  },
  col: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
});

const styles = StyleSheet.create({
  image: {flex: 1, justifyContent: 'center'},
  container: {flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.3)'},
  header: {
    flex: 0,
    paddingHorizontal: 20,
    paddingTop: 15,
    marginTop: StatusBar.currentHeight,
  },
  pickerContainer: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
  },
  listContainer: {
    flex: 1,
    paddingVertical: 20,
    backgroundColor: 'rgba(23, 23, 77, 0.479)',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});

interface Props {
  id: string;
  name: string;
  selectedHour: number;
  currentAmount: number;
  assignedToSelectedTime: boolean;
}

const MedicineItem: React.FC<Props> = ({
  id,
  selectedHour,
  name,
  currentAmount,
  assignedToSelectedTime,
}) => {
  const dispatch = useDispatch();
  return (
    <View style={medicineListStyles.itemContainer}>
      <View style={medicineListStyles.col}>
        <Text style={medicineListStyles.title}>{name}</Text>
        <Text style={medicineListStyles.subtitle}>
          осталось {currentAmount} шт.
        </Text>
      </View>
      <Pressable
        android_ripple={{radius: 20, color: 'grey'}}
        style={{padding: 20, right: -20, borderRadius: 100}}
        onPress={() =>
          dispatch(medicineActions.assignMedicine({id, hour: selectedHour}))
        }>
        <BellIcon
          fill={assignedToSelectedTime ? '#fff' : 'transparent'}
          stroke={!assignedToSelectedTime ? '#fff' : 'transparent'}
        />
      </Pressable>
    </View>
  );
};

const RemindersScreen: React.FC = () => {
  const [selectedHour, setSelectedHour] = useState(12);
  const medicineList = useSelector((state: AppState) =>
    selectByTime(state, selectedHour),
  );

  return (
    <ImageBackground
      source={require('../assets/images/bg1.png')}
      style={styles.image}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={generalStyles.h1}>Напоминания по часам</Text>
        </View>
        <View style={styles.pickerContainer}>
          <Picker
            style={{width: 400, height: 150}}
            lineGradientColorFrom="#1a1a1a"
            lineGradientColorTo="#FFF"
            selectedValue={selectedHour}
            onValueChange={(val) => setSelectedHour(val)}>
            {HOURS_AS_STRING_ARRAY.map((value, idx) => (
              <Picker.Item key={value} label={value} value={idx} />
            ))}
          </Picker>
        </View>
        <View style={styles.listContainer}>
          <ScrollView
            bounces
            contentContainerStyle={{paddingHorizontal: 30}}
            showsVerticalScrollIndicator={false}
            overScrollMode={'never'}>
            {medicineList.map((medicine) => {
              return (
                <MedicineItem
                  key={medicine.name}
                  id={medicine.id}
                  selectedHour={selectedHour}
                  name={medicine.name}
                  currentAmount={medicine.currentAmount}
                  assignedToSelectedTime={medicine.assignedToSelectedTime}
                />
              );
            })}
          </ScrollView>
        </View>
      </View>
    </ImageBackground>
  );
};

export default RemindersScreen;
