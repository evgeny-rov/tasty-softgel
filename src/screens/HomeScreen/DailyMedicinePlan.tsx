import React from 'react';
import {View, Text} from 'react-native';
import SizedBox from '@components/SizedBox';
import {theme, typography} from 'src/styles';
import {useSelector} from 'react-redux';
import hourToTimeString from 'src/utils/hourToTimeString';
import {byHourMedicinesSelector} from 'src/redux/entities/reminders/reminders.selectors';
import {AppStateType, Medicine} from 'src/types';

const PlanItem = ({hour, medicines}: {hour: number; medicines: Medicine[]}) => {
  const medicinesNames = useSelector((state: AppStateType) =>
    medicines.map(({id}) => state.medicines.byId[id].name),
  );
  const hasToRemind = new Date().getHours() === hour;

  const textColor = {
    color: hasToRemind ? theme.colors.accent2 : theme.colors.primary,
  };

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
  return (
    <View>
      {hourlyPlan.map((hourItem, idx) => (
        <PlanItem
          key={idx}
          hour={hourItem.hour}
          medicines={hourItem.medicines}
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
