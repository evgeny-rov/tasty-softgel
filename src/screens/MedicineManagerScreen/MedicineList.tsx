import React from 'react';
import {ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {medicinesSelector} from 'src/redux/entities/medicines/medicines.selectors';
import MedicineListItem from './MedicineListItem';

const MedicineList = () => {
  const medicines = useSelector(medicinesSelector);

  return (
    <ScrollView
      bounces
      showsVerticalScrollIndicator={false}
      overScrollMode={'never'}>
      {medicines.map((medicine) => (
        <MedicineListItem key={medicine.id} {...medicine} />
      ))}
    </ScrollView>
  );
};

export default MedicineList;
