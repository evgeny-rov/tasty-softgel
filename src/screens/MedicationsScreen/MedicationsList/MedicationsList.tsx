import React from 'react';
import {ScrollView} from 'react-native';
import {useAppSelector} from 'src/hooks/reduxHooks';

import {getAllMedications} from 'src/redux/slices/medications/selectors';
import MedicationsListItem from './MedicationsListItem';

const MedicationsList = () => {
  const medications = useAppSelector(getAllMedications);

  return (
    <>
      <ScrollView
        bounces
        showsVerticalScrollIndicator={false}
        overScrollMode={'never'}>
        {medications.map((medication) => (
          <MedicationsListItem key={medication.id} {...medication} />
        ))}
      </ScrollView>
    </>
  );
};

export default React.memo(MedicationsList);
