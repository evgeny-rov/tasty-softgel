import React from 'react';
import {StyleProp, StyleSheet, Text, TextStyle, View} from 'react-native';
import {shallowEqual} from 'react-redux';
import {useAppSelector} from 'src/hooks/reduxHooks';
import {getMedicationsSchedule} from 'src/redux/slices/scheduled_medications/selectors';
import {typography} from 'src/styles';

const MedicationsListItem = React.memo(({id}: {id: string}) => {
  const {name, quantity} = useAppSelector(
    (state) => state.medications.byId[id],
  );

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
  const medicationsIds = useAppSelector(
    (state) =>
      Object.keys(getMedicationsSchedule(state).byHourId[hourId] ?? {}),
    shallowEqual,
  );
  return (
    <>
      {medicationsIds.map((id) => (
        <MedicationsListItem key={id} id={id} />
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  medications_item_container: {
    paddingRight: 25,
  },
});

export default React.memo(MedicationsList);
