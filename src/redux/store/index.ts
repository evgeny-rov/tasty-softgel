import {applyMiddleware, combineReducers, createStore, Store} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import {AppStateType} from 'src/types';
import medicinesReducer from '../entities/medicines/medicines.reducer';
import assignmentsReducer from '../entities/assignments/assignments.reducer';
import consumptionsReducer from '../entities/consumptions/consumptions.reducer';
import modalMedicineReducer from '../entities/modal_medicine/modal_medicine.reducer';
import testMiddleware from 'src/services/notifications/notifications.middleware';
import {consumptionsRefresh} from '../entities/consumptions/consumptions.actions';

const persistConfig = {
  key: 'root-state',
  storage: AsyncStorage,
};

const rootReducer = combineReducers<AppStateType>({
  medicines: medicinesReducer,
  assignments: assignmentsReducer,
  consumptions: consumptionsReducer,
  modal_medicine: modalMedicineReducer,
});

const persistedReducer = persistReducer<AppStateType, any>(
  persistConfig,
  rootReducer,
);

// applying notifications middleware
const store = createStore(persistedReducer, applyMiddleware());

//store: Store<AppStateType & PersistPartial>

export const onStartUp = () => {
  console.log('store startup', store.getState());
  const lastConfirmationAt = store.getState().consumptions.lastConfirmationAt;
  store.dispatch(consumptionsRefresh({lastConfirmationAt}));
};

const persistor = persistStore(store, null, onStartUp);

// AsyncStorage.getAllKeys(() => {
//   console.log('rehydration event');
//   console.log('store', store.getState());
// });

export {store, persistor};
