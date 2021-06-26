import {ModalMedicineState} from 'src/types';
import {
  HIDE_MODAL_MEDICINE,
  SHOW_MODAL_MEDICINE,
  TypedHideModalMedicineAction,
  TypedShowModalMedicineAction,
} from './modal_medicine.actionTypes';

type TypedAction = TypedShowModalMedicineAction | TypedHideModalMedicineAction;

const initialState: ModalMedicineState = {
  isVisible: false,
  data: null,
};

export default (
  state = initialState,
  action: TypedAction,
): ModalMedicineState => {
  switch (action.type) {
    case SHOW_MODAL_MEDICINE: {
      const {data} = action.payload;

      return {
        ...state,
        isVisible: true,
        data,
      };
    }
    case HIDE_MODAL_MEDICINE: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
