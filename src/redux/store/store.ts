import {applyMiddleware, combineReducers, createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';

import medicationsReducer from '../slices/medications/reducer';
import scheduledMedicationsReducer from '../slices/scheduled_medications/reducer';
import medicationModalReducer from '../slices/medication_modal/reducer';

import {onStartUp} from './helpers';
import {persistConfig} from './persistor';

const rootReducer = combineReducers({
  medications: medicationsReducer,
  scheduled_medications: scheduledMedicationsReducer,
  medication_modal: medicationModalReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(thunk));

const persistor = persistStore(store as any, null, () => onStartUp(store));

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export {store, persistor};
