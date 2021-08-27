import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import {getMedicationById} from 'src/redux/slices/medications/selectors';
import useMedicationModal from 'src/hooks/useMedicationModal';
import {useAppSelector} from 'src/hooks/reduxHooks';
import ScheduledHourIdsList from './SchduledHourIdsSublist';
import {common, theme, typography} from '@styles/';

const MedicationsListItem = ({id}: {id: string}) => {
  const {showUpdateMedicationModal} = useMedicationModal();
  const {name, quantity} = useAppSelector(getMedicationById(id));

  const showModal = () => showUpdateMedicationModal({id, name, quantity});

  return (
    <Pressable
      android_ripple={{color: theme.colors.accent}}
      style={styles.container}
      onPress={showModal}>
      <View style={common.styles.flex}>
        <Text style={typography.styles.body_bold} numberOfLines={1}>
          {name}
        </Text>
        <ScheduledHourIdsList medicationId={id} />
      </View>
      <View>
        <Text style={typography.styles.subtext}>{quantity} шт.</Text>
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

export default React.memo(MedicationsListItem);
