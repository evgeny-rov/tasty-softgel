import {combineReducers, createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import {AppStateType} from 'src/types';
import medicinesReducer from '../entities/medicines/medicines.reducer';
import remindersReducer from '../entities/reminders/reminders.reducer';
import systemReducer from '../entities/system/system.reducer';

const persistConfig = {
  key: 'root-state',
  storage: AsyncStorage,
};

const rootReducer = combineReducers<AppStateType>({
  medicines: medicinesReducer,
  reminders: remindersReducer,
  system: systemReducer,
});

const persistedReducer = persistReducer<AppStateType, any>(
  persistConfig,
  rootReducer,
);

// add middleware
const store = createStore(persistedReducer);
const persistor = persistStore(store);

export {store, persistor};
