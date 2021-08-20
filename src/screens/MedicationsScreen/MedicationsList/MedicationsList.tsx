import React from 'react';
import {FlatList} from 'react-native';
import {useAppSelector} from 'src/hooks/reduxHooks';

import {getAllMedicationsIds} from 'src/redux/slices/medications/selectors';
import MedicationsListItem from './MedicationsListItem';

const MedicationsList = () => {
  const medications = useAppSelector(getAllMedicationsIds);

  return (
    <FlatList
      data={medications}
      renderItem={({item: id}) => <MedicationsListItem id={id} />}
      keyExtractor={(id) => id}
    />
  );
};

export default MedicationsList;
