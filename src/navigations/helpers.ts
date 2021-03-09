import routes from './routes';
import {StackNavigationHelpers} from '@react-navigation/stack/src/types';

export const openNewMedicineModal = (navigation: StackNavigationHelpers) =>
  navigation.navigate(routes.modal_new_medicine);

export const openMedicineCardModal = (navigation: StackNavigationHelpers) =>
  navigation.navigate(routes.modal_medicine_card);
