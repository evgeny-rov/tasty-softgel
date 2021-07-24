import {applyMiddleware, combineReducers, createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import medicinesReducer from '../entities/medicines/medicines.reducer';
import assignmentsReducer from '../entities/assignments/assignments.reducer';
import consumptionsReducer from '../entities/daily_assignments/daily_assignments.reducer';
import modalMedicineReducer from '../entities/modal_medicine/modal_medicine.reducer';
import {persistConfig} from './persistor';
import {middlewares} from '../middlewares';
import {AppStateType} from 'src/types';

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

const store = createStore(persistedReducer, applyMiddleware(...middlewares));

const persistor = persistStore(store, null);

export {store, persistor};
