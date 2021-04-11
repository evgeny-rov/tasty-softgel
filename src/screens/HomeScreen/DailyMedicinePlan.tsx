import React from 'react';
import {View, Text, Button} from 'react-native';
import SizedBox from '@components/SizedBox';
import {theme, typography} from 'src/styles';
import {useDispatch, useSelector} from 'react-redux';
import hourToTimeString from 'src/utils/hourToTimeString';
import {byHourMedicinesSelector} from 'src/redux/entities/reminders/reminders.selectors';
import {AppStateType, Medicine} from 'src/types';
import {confirmConsumption} from 'src/redux/entities/system/system.actions';

const PlanItem = ({
  hour,
  medicines,
  isActive,
}: {
  hour: number;
  medicines: Medicine[];
  isActive: boolean;
}) => {
  const dispatch = useDispatch();
  const medicinesNames = useSelector((state: AppStateType) =>
    medicines.map(({id}) => state.medicines.byId[id].name),
  );

  const isConsumptionConfirmed = useSelector(
    (state: AppStateType) => state.system.isDataUpdated,
  );

  const textColor = {
    color: isActive ? theme.colors.accent2 : theme.colors.primary,
  };

  const confirmationBtn = (
    <Button
      title="confirm"
      onPress={() => dispatch(confirmConsumption())}></Button>
  );

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginVertical: 10,
      }}>
      <Text style={[typography.styles.body_bold, textColor]}>
        {hourToTimeString(Number(hour))}
      </Text>
      <SizedBox width={50} />
      {!isConsumptionConfirmed && isActive && confirmationBtn}
      <Text
        style={[
          typography.styles.body_bold,
          {textAlign: 'right', flex: 1, ...textColor},
        ]}>
        {medicinesNames.join(', ')}
      </Text>
    </View>
  );
};

const PlanList = () => {
  const hourlyPlan = useSelector(byHourMedicinesSelector);
  const currentSystemHour = useSelector(
    (state: AppStateType) => state.system.currentHour,
  );

  console.log('homepage render, current hour is:', currentSystemHour);

  return (
    <View>
      {hourlyPlan.map((hourItem, idx) => (
        <PlanItem
          key={idx}
          hour={hourItem.hour}
          medicines={hourItem.medicines}
          isActive={hourItem.hour === currentSystemHour}
        />
      ))}
    </View>
  );
};

const DailyMedicinePlan = () => {
  return (
    <View style={styles.container}>
      <Text style={typography.styles.h1}>Ежедневный план</Text>
      <SizedBox height={35} />
      <PlanList />
    </View>
  );
};

const styles = {
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingVertical: 50,
    paddingHorizontal: 35,
    borderBottomRightRadius: 70,
    // maxHeight: '80%',
  },
};

export default DailyMedicinePlan;
