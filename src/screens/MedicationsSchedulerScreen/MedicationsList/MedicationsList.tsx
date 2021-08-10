import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {useAppSelector} from 'src/hooks/reduxHooks';
import {getAllMedications} from 'src/redux/slices/medications/selectors';
import MedicationsListItem from './MedicationsListItem';

type Props = {
  selectedHourId: number;
};

const MedicationsList = ({selectedHourId}: Props) => {
  const medications = useAppSelector(getAllMedications);

  return (
    <ScrollView
      bounces
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      overScrollMode={'never'}>
      {medications.map((medication) => (
        <MedicationsListItem
          key={medication.id}
          {...medication}
          selectedHourId={selectedHourId}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
});

export default React.memo(MedicationsList);
