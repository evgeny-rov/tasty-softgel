import {AppStateType, Medicine} from 'src/types';
import {
  TypedAddAssignmentAction,
  TypedRemoveAssignmentAction,
} from 'src/redux/entities/assignments/assignments.actionTypes';
import {TypedConfirmConsumptionAction} from 'src/redux/entities/daily_assignments/daily_assignments.actionTypes';

import * as Notifications from './notifications.api';
import getAvailableDateFromHour from 'src/utils/getAvailableDateFromHour';

import {
  getAssignmentsByHour,
  getMedicinesSuppliesByHour,
} from 'src/redux/entities/assignments/assignments.selectors';

import groupMedicinesBySupply from 'src/utils/groupMedicinesBySupply';
import {HOURS_AS_TIME_STRING} from 'src/constants';
import {channelsData} from './notifications.channels';

const dailyReminderBaseParams = {
  channelId: channelsData.byId.daily_notifications.channelId,
  title: 'Напоминание о приеме',
  actions: ['Я не забыл'],
  tag: 'reminder',
  group: 'daily-reminder',
};

const scheduleDailyNotification = (scheduledDate: Date, message: string) => {
  Notifications.scheduleNotification({
    ...dailyReminderBaseParams,
    date: scheduledDate,
    id: scheduledDate.getHours(),
    subText: HOURS_AS_TIME_STRING[scheduledDate.getHours()],
    message,
    invokeApp: false,
    autoCancel: false,
    repeatType: 'day',
  });
};

const showLowSupplyNotification = (title: string, message: string) => {
  Notifications.showNotification({
    channelId: channelsData.byId.daily_notifications.channelId,
    tag: 'supply',
    group: 'supply',
    title,
    message,
  });
};

const issueLowSupplyNotifications = (medicines: Medicine[]) => {
  const {depleted, depletes_soon} = groupMedicinesBySupply(medicines);

  depleted.length > 0 &&
    showLowSupplyNotification(
      'Закончились лекарства',
      depleted.map(({name}) => name).join(', '),
    );

  depletes_soon.length > 0 &&
    showLowSupplyNotification(
      'Заканчиваются лекарства',
      depletes_soon.map(({name}) => name).join(', '),
    );
};

const createReminder = (assignedHour: number) => {
  const scheduledDate = getAvailableDateFromHour(assignedHour);
  scheduleDailyNotification(scheduledDate, 'Не забудь выпить лекарства!');
};

const cancelReminder = (hour: number) => {
  Notifications.cancelNotification(dailyReminderBaseParams.tag, hour);
};

// handlers

export const handleNewAssignment = (
  payload: TypedAddAssignmentAction['payload'],
  state: AppStateType,
) => {
  const shouldCreateReminder =
    state.medicines.byId[payload.medicineId].count > 0;
  if (shouldCreateReminder) createReminder(payload.hour);
};

export const handleRemoveAssignment = (
  payload: TypedRemoveAssignmentAction['payload'],
  state: AppStateType,
) => {
  const hasRemainingAssignments = getAssignmentsByHour(state).hasOwnProperty(
    payload.hour,
  );

  if (hasRemainingAssignments) {
    return;
  } else {
    cancelReminder(payload.hour);
  }
};

export const handleMedicinesUpdates = (state: AppStateType) => {
  const medicinesSupplies = getMedicinesSuppliesByHour(state);

  for (const hourKey in medicinesSupplies) {
    const hour = Number(hourKey);
    medicinesSupplies[hour].total > 0
      ? createReminder(hour)
      : cancelReminder(hour);
  }
};

export const handleConfirmationAction = (
  payload: TypedConfirmConsumptionAction['payload'],
  state: AppStateType,
) => {
  const {assignedMedicines, hour} = payload;

  cancelReminder(hour);
  issueLowSupplyNotifications(assignedMedicines);
  handleMedicinesUpdates(state);
};
