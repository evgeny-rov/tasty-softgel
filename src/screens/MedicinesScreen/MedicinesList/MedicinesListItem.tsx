import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import {HOURS_AS_TIME_STRING} from '@constants/';
import useModalMedicine from 'src/hooks/useModalMedicine';
import {theme, typography} from '@styles/';
import {Assignment, Medicine} from 'src/types';
import {useSelector} from 'react-redux';
import {RootState} from 'src/redux/store';
import {getMedicinesWithAssignmentsHours} from 'src/redux/entities/medicines/medicines.selectors';

interface Props {
  medicineId: string;
}

const MedicinesListItem = ({medicineId}: Props) => {
  const {showModalUpdateMedicine} = useModalMedicine();
  const medicine = useSelector(
    (state: RootState) => state.medicines.byId[medicineId],
  );

  const assignmentsList = useSelector(getMedicinesWithAssignmentsHours)[
    medicineId
  ].map((hour) => HOURS_AS_TIME_STRING[hour] + '  ');

  const showModal = () => showModalUpdateMedicine(medicine);

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

export default React.memo(MedicinesListItem);
