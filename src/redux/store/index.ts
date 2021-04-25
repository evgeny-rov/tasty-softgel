import {applyMiddleware, combineReducers, createStore, Store} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import {AppStateType} from 'src/types';
import medicinesReducer from '../entities/medicines/medicines.reducer';
import assignmentsReducer from '../entities/assignments/assignments.reducer';
import consumptionsState from '../entities/consumptions/consumptions.reducer';
import testMiddleware from 'src/services/notifications/notifications.middleware';
import {PersistPartial} from 'redux-persist/es/persistReducer';
import {consumptionsRefresh} from '../entities/consumptions/consumptions.actions';

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
const store = createStore(persistedReducer, applyMiddleware());
const persistor = persistStore(store);

export const onStartUp = (store: Store<AppStateType & PersistPartial>) => {
  const lastConfirmationAt = store.getState().consumptions.lastConfirmationAt;
  store.dispatch(consumptionsRefresh({lastConfirmationAt}));
};

export {store, persistor};
