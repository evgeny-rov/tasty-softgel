import React, {useState} from 'react';
import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import FloatingActionButton from '../components/FloatingActionButton';
import MedicineModal from '../components/MedicineModal/MedicineModal';
import SizedBox from '../components/SizedBox';
import {AppState, Medicine} from '../redux';

const styles = StyleSheet.create({
  container: {
    marginTop: 70,
    flex: 1,
    padding: 30,
    borderTopLeftRadius: 30,
    borderTopEndRadius: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  flex: {
    flex: 1,
  },
  bgImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    flex: 1,
  },
});

const textStyles = StyleSheet.create({
  h1: {
    color: 'white',
    fontWeight: '800',
    fontSize: 22,
  },
  h2: {
    color: 'white',
    fontWeight: '800',
    fontSize: 16,
  },
});

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
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  col: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
});

const MedicineItem: React.FC<Medicine> = ({
  name,
  initialAmount,
  currentAmount,
}) => {
  return (
    <View style={medicineListStyles.itemContainer}>
      <View style={medicineListStyles.col}>
        <Text style={medicineListStyles.title}>{name}</Text>
        <Text style={medicineListStyles.subtitle}>
          осталось {currentAmount} шт.
        </Text>
      </View>
      <Text style={medicineListStyles.reminderTime}>under dev</Text>
    </View>
  );
};

const MedicineScreen: React.FC = () => {
  const medicineList = useSelector((state: AppState) =>
    state.allIds.map((id) => state.byId[id]),
  );
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <StatusBar translucent backgroundColor={'transparent'} />
      <Image
        source={require('../assets/images/bg1.png')}
        style={styles.bgImage}
      />
      <View style={styles.flex}>
        <View style={styles.container}>
          <Text style={textStyles.h1}>Ваши лекарства</Text>
          <SizedBox height={40} />
          <ScrollView
            bounces
            showsVerticalScrollIndicator={false}
            overScrollMode={'never'}>
            {medicineList.map((medicine) => {
              return <MedicineItem key={medicine.name} {...medicine} />;
            })}
          </ScrollView>
        </View>
        <FloatingActionButton
          onPress={() => {
            setModalVisible(true);
          }}
        />
        <MedicineModal
          title={'Новое лекарство'}
          mode={'add'}
          modalVisible={modalVisible}
          setVisibility={setModalVisible}
        />
      </View>
    </>
  );
};

export default MedicineScreen;
