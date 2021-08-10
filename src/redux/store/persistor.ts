import AsyncStorage from '@react-native-community/async-storage';
import {Persistor, PersistorSubscribeCallback} from 'redux-persist';

const PERSISTOR_ROOT_STATE_KEY = 'root-state';

const persistConfig = {
  key: PERSISTOR_ROOT_STATE_KEY,
  storage: AsyncStorage,
  blacklist: ['medication_modal'],
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
