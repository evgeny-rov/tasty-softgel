import React from 'react';
import {ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {AppState} from 'src/types';
import MedicineListItem from './MedicineListItem';

const MedicineList = () => {
  const medicines = useSelector((state: AppState) =>
    state.allIds.map((id) => state.byId[id]),
  );

  return (
    <ScrollView
      bounces
      showsVerticalScrollIndicator={false}
      overScrollMode={'never'}>
      {medicines.map((medicine) => {
        return <MedicineListItem key={medicine.id} {...medicine} />;
      })}
    </ScrollView>
  );
};

export default MedicineList;
