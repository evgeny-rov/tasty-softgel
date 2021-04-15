import React, {useEffect} from 'react';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './redux/store';
import AppNavigation from './navigation';
import {systemRevive, systemStep} from './redux/entities/system/system.actions';
import {AppStateType} from './types';

const App = () => {
  const dispatch = useDispatch();
  const systemState = useSelector((state: AppStateType) => state.system);

  const updateSystemState = () => {
    dispatch(systemStep());
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentSystemHour = systemState.currentHour;
      const currentHour = new Date().getHours();

      console.log('state recheck', currentSystemHour, currentHour);
      currentHour !== currentSystemHour && updateSystemState();
    }, 10000);

    dispatch(
      systemRevive({
        lastConsumptionConfirmationAt:
          systemState.lastConsumptionConfirmationAt,
      }),
    );

    return () => clearInterval(intervalId);
  }, []);

  return <AppNavigation />;
};

const RootComponent = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};

export default RootComponent;
