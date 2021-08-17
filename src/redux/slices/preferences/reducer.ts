import * as TYPES from './actionTypes';
import type {toggleNotificationsStateAction} from './actions';

type Actions = toggleNotificationsStateAction;

const initialState = {
  isNotificationsActive: true,
};

const reducer = (
  state = initialState,
  action: Actions,
): typeof initialState => {
  switch (action.type) {
    case TYPES.NOTIFICATIONS_STATE_CHANGE: {
      const {nextState} = action.payload;

      return {
        ...state,
        isNotificationsActive: nextState,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
