import {createSlice, nanoid} from '@reduxjs/toolkit';
import {configureStore} from '@reduxjs/toolkit';

export type Medicine = {
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
        name,
        initialAmount,
        currentAmount,
      };
    },
  },
});

const rootReducer = medicineSlice.reducer;

export const medicineActions = medicineSlice.actions;

export type AppState = ReturnType<typeof rootReducer>;

export const store = configureStore({reducer: rootReducer});

store.subscribe(() => console.log(store.getState()));
