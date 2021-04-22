import {applyMiddleware, combineReducers, createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import {AppStateType} from 'src/types';
import medicinesReducer from '../entities/medicines/medicines.reducer';
import remindersReducer from '../entities/reminders/reminders.reducer';
import systemReducer from '../entities/system/system.reducer';
import testMiddleware from 'src/services/notifications/notifications.middleware';

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
const store = createStore(persistedReducer, applyMiddleware(testMiddleware));
const persistor = persistStore(store);

export {store, persistor};
