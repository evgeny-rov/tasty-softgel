import {Medicine} from 'src/types';

export const SHOW_MODAL_MEDICINE = 'SHOW_MODAL_MEDICINE';
export const HIDE_MODAL_MEDICINE = 'HIDE_MODAL_MEDICINE';

export type TypedShowModalMedicineAction = {
  type: typeof SHOW_MODAL_MEDICINE;
  payload: {data: Medicine | null};
};

export type TypedHideModalMedicineAction = {
  type: typeof HIDE_MODAL_MEDICINE;
  payload: {};
};
