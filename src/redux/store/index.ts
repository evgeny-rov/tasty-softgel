import {applyMiddleware, combineReducers, createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import {AppStateType} from 'src/types';
import medicinesReducer from '../entities/medicines/medicines.reducer';
import assignmentsReducer from '../entities/assignments/assignments.reducer';
import consumptionsState from '../entities/consumptions/consumptions.reducer';
import testMiddleware from 'src/services/notifications/notifications.middleware';

const persistConfig = {
  key: 'root-state',
  storage: AsyncStorage,
};

const rootReducer = combineReducers<AppStateType>({
  medicines: medicinesReducer,
  assignments: assignmentsReducer,
  consumptions: consumptionsState,
});

const persistedReducer = persistReducer<AppStateType, any>(
  persistConfig,
  rootReducer,
);

// applying notifications middleware
const store = createStore(persistedReducer, applyMiddleware(testMiddleware));
const persistor = persistStore(store);

export {store, persistor};
