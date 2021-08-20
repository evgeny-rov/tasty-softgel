import * as MEDICATION_MODAL_TYPES from './actionTypes';
import type {MedicationModalState} from 'src/types';
import type {ModalMedicationActions} from './actions';

type Actions = ModalMedicationActions;

const initialState: MedicationModalState = {
  isVisible: false,
  data: null,
};

const reducer = (
  state = initialState,
  action: Actions,
): MedicationModalState => {
  switch (action.type) {
    case MEDICATION_MODAL_TYPES.SHOW_MEDICATION_MODAL: {
      const {data} = action.payload;

      return {
        ...state,
        isVisible: true,
        data,
      };
    }
    case MEDICATION_MODAL_TYPES.HIDE_MEDICATION_MODAL: {
      return {
        ...state,
        isVisible: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
