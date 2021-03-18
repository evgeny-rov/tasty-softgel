import {createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import rootReducer from '../reducers/rootReducer';
import {AppState} from 'src/types';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer<AppState, any>(
  persistConfig,
  rootReducer,
);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export {store, persistor};
