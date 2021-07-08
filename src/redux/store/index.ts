import {applyMiddleware, combineReducers, createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import {AppStateType} from 'src/types';
import medicinesReducer from '../entities/medicines/medicines.reducer';
import assignmentsReducer from '../entities/assignments/assignments.reducer';
import consumptionsReducer from '../entities/daily_assignments/daily_assignments.reducer';
import modalMedicineReducer from '../entities/modal_medicine/modal_medicine.reducer';
import NotificationsMiddleware from 'src/services/notifications/notifications.middleware';
import {dailyAssignmentsRefresh} from '../entities/daily_assignments/daily_assignments.actions';
import {PersistConfig} from 'redux-persist/es/types';

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
// NotificationsMiddleware
const store = createStore(
  persistedReducer,
  applyMiddleware(),
);

const onStoreInit = () => {
  const {lastConfirmationAt} = store.getState().daily_assignments;
  store.dispatch(dailyAssignmentsRefresh({lastConfirmationAt}));
};

const persistor = persistStore(store, null);

export {store, persistor, onStoreInit};
