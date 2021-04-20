import React, {useEffect} from 'react';
import {Provider, useDispatch} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './redux/store';
import AppNavigation from './navigation';
import {systemRevive, systemStep} from './redux/entities/system/system.actions';
import {initNotificationsManager} from './services/notifications/notifications.manager';

initNotificationsManager(store);

const App = () => {
  const dispatch = useDispatch();

  const updateSystemState = () => {
    dispatch(systemStep());
  };

  console.log('app render');

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentSystemHour = store.getState().system.currentHour;
      const currentHour = new Date().getHours();

      console.log('state recheck', currentSystemHour, currentHour);
      currentHour !== currentSystemHour && updateSystemState();
    }, 10000);

    dispatch(
      systemRevive({
        lastConsumptionConfirmationAt: store.getState().system
          .lastConsumptionConfirmationAt,
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
