import {NavigationProp} from '@react-navigation/core';
import {StackNavigationHelpers} from '@react-navigation/stack/src/types';
import {Medicine} from 'src/types';
import routes from './routes';

export const openMedicineModal = (
  navigation: NavigationProp<any, any>,
  mode: 'update' | 'new',
  medicineData?: Medicine,
) =>
  navigation.navigate(routes.modal_medicine_card, {
    medicine: medicineData,
    mode,
  });
