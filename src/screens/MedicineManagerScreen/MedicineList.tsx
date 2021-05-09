import React from 'react';
import {ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {medicinesWithAssignmentsSelector} from 'src/redux/entities/medicines/medicines.selectors';
import MedicineListItem from './MedicineListItem';

const MedicineList = () => {
  const medicines = useSelector(medicinesWithAssignmentsSelector);

  return (
    <ScrollView
      bounces
      showsVerticalScrollIndicator={false}
      overScrollMode={'never'}>
      {medicines.map(({medicine, assignments}) => (
        <MedicineListItem
          key={medicine.id}
          medicine={medicine}
          assignments={assignments}
        />
      ))}
    </ScrollView>
  );
};

export default MedicineList;
