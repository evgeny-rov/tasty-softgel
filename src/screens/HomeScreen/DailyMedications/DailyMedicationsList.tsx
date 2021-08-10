import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useAppSelector} from 'src/hooks/reduxHooks';

import {getDailyScheduledMedications} from 'src/redux/slices/scheduled_medications/selectors';
import DailyMedicationsListItem from './DailyMedicationsListItem/';

// previous update hourid func
// useEffect(() => {
//   const intervalId = setInterval(() => {
//     const currentSystemHour = new Date().getHours();
//     const hourShouldUpdate = currentHour !== currentSystemHour;
//     hourShouldUpdate && dispatch(dailyAssignmentsRefresh());
//   }, 5000);

//   return () => clearInterval(intervalId);
// }, [currentHour]);

const DailyMedicationsList = () => {
  const dailyScheduledMedications = useAppSelector(
    getDailyScheduledMedications,
  );

  return (
    <View style={styles.container}>
      {dailyScheduledMedications.map((dailyMedications) => (
        <DailyMedicationsListItem
          key={dailyMedications.hourId}
          {...dailyMedications}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
});

export default DailyMedicationsList;
