import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Assignment, Medicine} from 'src/types';

import {theme, typography} from '@styles/';
import hourToTimeString from 'src/utils/hourToTimeString';
import Icon from '@components/Icon';
import {useDispatch} from 'react-redux';
import {showModalMedicine} from 'src/redux/entities/modal_medicine/modal_medicine.actions';

interface Props {
  medicine: Medicine;
  assignments: Assignment[];
}

const MedicineListItem = ({medicine, assignments}: Props) => {
  const dispatch = useDispatch();
  const assignmentsList = assignments
    .map(({hour}) => hourToTimeString(hour))
    .join(', ');

  const showModal = () => dispatch(showModalMedicine(medicine));

  return (
    <Pressable
      android_ripple={{color: theme.colors.accent}}
      style={styles.container}
      onPress={showModal}>
      <View>
        <Text style={typography.styles.body_bold} numberOfLines={1}>
          {medicine.name}
        </Text>
        <Text numberOfLines={1} style={typography.styles.body_sub_gray}>
          {assignmentsList || 'Прием не назначен'}
        </Text>
      </View>
      <View>
        <Text style={typography.styles.body_sm}>{medicine.count} шт.</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

export default MedicineListItem;
