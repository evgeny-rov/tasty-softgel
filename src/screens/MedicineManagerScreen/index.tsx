import React from 'react';
import {StackNavigationHelpers} from '@react-navigation/stack/src/types';
import {useSelector} from 'react-redux';
import {AppState} from '../../redux/reducers';
import {
  medicineListStyles,
  styles,
  textStyles,
} from './MedicineManagerScreenStyles';
import {StatusBar, View, Text, ScrollView} from 'react-native';
import SizedBox from '../../components/SizedBox';
import BgImage from '../../components/BgImage';
import routes from '../../navigations/routes';
import {Medicine} from '../../redux/actions/actions';

interface Props {
  navigation: StackNavigationHelpers;
}

const MedicineItem = ({name, currentAmount}: Medicine) => {
  return (
    <View style={medicineListStyles.itemContainer}>
      <View style={medicineListStyles.col}>
        <Text style={medicineListStyles.title}>{name}</Text>
        <Text style={medicineListStyles.subtitle}>{currentAmount} шт.</Text>
      </View>
      <Text style={medicineListStyles.reminderTime}>under dev</Text>
    </View>
  );
};

const MedicineManagerScreen = ({navigation}: Props) => {
  const medicineList = useSelector((state: AppState) =>
    state.allIds.map((id) => state.byId[id]),
  );

  const openMedicineModal = () => navigation.navigate(routes.medicine_modal);

  return (
    <>
      <StatusBar translucent backgroundColor={'transparent'} />
      <BgImage source={require('../../assets/images/bg1.png')} />
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
      </View>
    </>
  );
};

export default MedicineManagerScreen;
