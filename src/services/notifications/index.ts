import {channelsData} from './notifications.channels';

import * as Notifications from './notifications.api';
import {bootstrapPersistor} from 'src/redux/store/persistor';
import {confirmConsumption} from 'src/redux/entities/daily_assignments/daily_assignments.actions';
import {getAssignmentsWithMedicines} from 'src/redux/entities/assignments/assignments.selectors';

import {Store} from 'redux';
import {Persistor} from 'redux-persist';
import {PersistPartial} from 'redux-persist/es/persistReducer';
import {ReceivedNotification} from 'react-native-push-notification';
import {AppStateType} from 'src/types';

const handleNotificationAction = async (
  notification: ReceivedNotification,
  store: Store<AppStateType & PersistPartial, any>,
  persistor: Persistor,
) => {
  const hourId = Number(notification.id);
  const currentHour = new Date().getHours();
  await bootstrapPersistor(persistor);
  const state = store.getState();
  const {confirmedHours} = state.daily_assignments;
  const medicines = getAssignmentsWithMedicines(state)[hourId] || [];

  if (!confirmedHours.includes(hourId)) {
    store.dispatch(confirmConsumption(hourId, medicines, hourId > currentHour));
    await persistor.flush();
  } else {
    return;
  }
};

export default (
  store: Store<AppStateType & PersistPartial, any>,
  persistor: Persistor,
) => {
  Notifications.configure({
    channelsConfigs: Object.values(channelsData.byId),
    onNotificationActions: (notification: ReceivedNotification) =>
      handleNotificationAction(notification, store, persistor),
  });
};
