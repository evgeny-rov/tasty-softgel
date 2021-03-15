import React from 'react';
import {View, Text} from 'react-native';
import SizedBox from '@components/SizedBox';
import {theme, typography} from 'src/styles';
import {ScrollView} from 'react-native-gesture-handler';
import {AppState, Reminder} from 'src/types';
import {useSelector} from 'react-redux';
import hourToTimeString from 'src/utils/hourToTimeString';

const PlanItem = ({reminder}: {reminder: Reminder}) => {
  const medicines = useSelector((state: AppState) =>
    reminder.medicines.map((id) => state.medicines.byId[id].name),
  );

  const medicinesNames = medicines.join(', ');

  const hasToRemind = Math.abs(new Date().getHours() - reminder.hour) <= 1;

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
        {hourToTimeString(reminder.hour)}
      </Text>
      <SizedBox width={50} />
      <Text
        style={[
          typography.styles.body_bold,
          {textAlign: 'right', flex: 1, ...textColor},
        ]}>
        {medicinesNames}
      </Text>
    </View>
  );
};

const PlanList = () => {
  const reminders = useSelector((state: AppState) =>
    state.reminders.allHours
      .sort((a, b) => a - b)
      .map((hour) => state.reminders.byHour[hour]),
  );
  return (
    <View>
      {reminders.map((reminder) => (
        <PlanItem key={reminder.hour} reminder={reminder} />
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
