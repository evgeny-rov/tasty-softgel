import React from 'react';
import {StyleProp, StyleSheet, Text, TextStyle, View} from 'react-native';
import {useAppSelector} from 'src/hooks/reduxHooks';
import {getMedications} from 'src/redux/slices/medications/selectors';
import {getMedicationsSchedule} from 'src/redux/slices/scheduled_medications/selectors';
import {typography} from 'src/styles';
import {Medication} from 'src/types';

const MedicationsListItem = React.memo(({id, name, quantity}: Medication) => {
  // const medication = useAppSelector(getMedications)[id];

  const textStyle: StyleProp<TextStyle> = {
    ...typography.styles.body_bold,
    fontStyle: quantity === 0 ? 'italic' : 'normal',
    textDecorationLine: quantity === 0 ? 'line-through' : 'none',
  };

  return (
    <View style={styles.medications_item_container}>
      <Text style={textStyle}>{name}</Text>
    </View>
  );
});

const MedicationsList = ({hourId}: {hourId: number}) => {
  const medicationsIds = useAppSelector(getMedicationsSchedule).byHourId[
    hourId
  ];
  const medications = useAppSelector(getMedications);

  return (
    <>
      {medicationsIds.map((id) => {
        return <MedicationsListItem key={id} {...medications[id]} />;
      })}
    </>
  );
};

const styles = StyleSheet.create({
  medications_item_container: {
    paddingRight: 25,
  },
});

export default React.memo(MedicationsList);
