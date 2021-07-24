import {
  HIDE_MODAL_MEDICINE,
  SHOW_MODAL_MEDICINE,
  TypedHideModalMedicineAction,
  TypedShowModalMedicineAction,
} from './modal_medicine.actionTypes';
import {Medicine} from 'src/types';

export const showModalMedicine = (
  data: Medicine | null = null,
): TypedShowModalMedicineAction => ({
  type: SHOW_MODAL_MEDICINE,
  payload: {data},
});

export const hideModalMedicine = (): TypedHideModalMedicineAction => ({
  type: HIDE_MODAL_MEDICINE,
  payload: {},
});
