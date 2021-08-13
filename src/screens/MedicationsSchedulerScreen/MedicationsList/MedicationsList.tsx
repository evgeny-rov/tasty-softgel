import React from 'react';
import {FlatList, ScrollView, StyleSheet} from 'react-native';
import {useAppSelector} from 'src/hooks/reduxHooks';
import {getAllMedicationsIds} from 'src/redux/slices/medications/selectors';
import SizedBox from '@components/SizedBox';
import MedicationsListItem from './MedicationsListItem';

type Props = {
  selectedHourId: number;
};

const ListSeparator = () => <SizedBox height={5} />;

const MedicationsList = ({selectedHourId}: Props) => {
  const medicationsIds = useAppSelector(getAllMedicationsIds);

  return (
    <FlatList
      style={styles.container}
      data={medicationsIds}
      ItemSeparatorComponent={ListSeparator}
      keyExtractor={(id) => id}
      renderItem={({item: id}) => (
        <MedicationsListItem id={id} selectedHourId={selectedHourId} />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
});

export default MedicationsList;
