import {createSlice, nanoid} from '@reduxjs/toolkit';
import {configureStore} from '@reduxjs/toolkit';

export type Medicine = {
  id: string;
  name: string;
  initialAmount: number;
  currentAmount: number;
};

interface State {
  allIds: string[];
  byId: {
    [id: string]: Medicine;
  };
  byTime: {
    [hour: number]: string[];
  };
}

const initialState: State = {
  allIds: [],
  byId: {},
  byTime: {},
};

const medicineSlice = createSlice({
  name: 'medicine',
  initialState: initialState,
  reducers: {
    addMedicine(state, action) {
      const {name, initialAmount, currentAmount} = action.payload;
      const newId = nanoid();
      state.allIds.push(newId);
      state.byId[newId] = {
        id: newId,
        name,
        initialAmount,
        currentAmount,
      };
    },
    assignMedicine(state, action) {
      const {id, hour} = action.payload;
      if (!state.byTime[hour]) {
        state.byTime[hour] = [id];
      } else {
        const index = state.byTime[hour].findIndex((item) => item === id);
        index === -1
          ? state.byTime[hour].push(id)
          : state.byTime[hour].splice(index, 1);
      }
    },
  },
});

export const selectByTime = (state: AppState, hour: number) => {
  return state.allIds.map((id) => {
    const assignedToSelectedTime =
      state.byTime[hour] && state.byTime[hour].includes(id);
    return {...state.byId[id], assignedToSelectedTime};
  });
};

const rootReducer = medicineSlice.reducer;

export const medicineActions = medicineSlice.actions;

export type AppState = ReturnType<typeof rootReducer>;

export const store = configureStore({reducer: rootReducer});

store.subscribe(() => console.log(store.getState()));
