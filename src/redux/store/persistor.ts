import AsyncStorage from '@react-native-community/async-storage';
import {
  PersistConfig,
  Persistor,
  PersistorSubscribeCallback,
} from 'redux-persist';
import {AppStateType} from 'src/types';

const persistConfig: PersistConfig<AppStateType> = {
  key: 'root-state',
  storage: AsyncStorage,
  blacklist: ['modal_medicine'],
};

const bootstrapPersistor = (persistor: Persistor) => {
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

export {persistConfig, bootstrapPersistor};
