import {applyMiddleware, combineReducers, createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';

import medicationsReducer from '../slices/medications/reducer';
import scheduledMedicationsReducer from '../slices/scheduled_medications/reducer';
import medicationModalReducer from '../slices/medication_modal/reducer';

import {persistConfig} from './persistor';
import scheduledMedicationsClock from '../slices/scheduled_medications/scheduledMedicationsClock';

const rootReducer = combineReducers({
  medications: medicationsReducer,
  scheduled_medications: scheduledMedicationsReducer,
  medication_modal: medicationModalReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(thunk));

const onStartUp = () => {
  scheduledMedicationsClock(store.getState, store.dispatch);
};

const persistor = persistStore(store as any, null, onStartUp);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export {store, persistor};
