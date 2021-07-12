import {applyMiddleware, combineReducers, createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import {
  PersistConfig,
  PersistorSubscribeCallback,
} from 'redux-persist/es/types';
import {AppStateType} from 'src/types';
import medicinesReducer from '../entities/medicines/medicines.reducer';
import assignmentsReducer from '../entities/assignments/assignments.reducer';
import consumptionsReducer from '../entities/daily_assignments/daily_assignments.reducer';
import modalMedicineReducer from '../entities/modal_medicine/modal_medicine.reducer';
import appRefresh from '../middlewares/appRefresh';

const persistConfig: PersistConfig<AppStateType> = {
  key: 'root-state',
  storage: AsyncStorage,
  blacklist: ['modal_medicine'],
};

const rootReducer = combineReducers<AppStateType>({
  medicines: medicinesReducer,
  assignments: assignmentsReducer,
  daily_assignments: consumptionsReducer,
  modal_medicine: modalMedicineReducer,
});

const persistedReducer = persistReducer<AppStateType, any>(
  persistConfig,
  rootReducer,
);

const store = createStore(persistedReducer, applyMiddleware(appRefresh));

const persistor = persistStore(store, null);

const initPersistor = () => {
  return new Promise((resolve, reject) => {
    let unsubscribe: PersistorSubscribeCallback | null = null;

    const handlePersistorUpdate = () => {
      const {bootstrapped} = persistor.getState();

      if (unsubscribe !== null && bootstrapped) {
        unsubscribe();
        resolve(null);
      }
    };

    unsubscribe = persistor.subscribe(handlePersistorUpdate);
    handlePersistorUpdate();

    setTimeout(() => {
      unsubscribe !== null && unsubscribe();
      reject("Persistor didn't get bootstrapped in 15 seconds");
    }, 15000);
  });
};

export {store, persistor, initPersistor};
