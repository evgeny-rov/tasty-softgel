import React, { useCallback } from 'react';
import {Pressable, View, StyleSheet} from 'react-native';

import {useAppDispatch} from 'src/hooks/reduxHooks';
import SizedBox from '@components/SizedBox';
import StatusIndicator from './StatusIndicator';
import StatusBar from './StatusBar';
import MedicationsList from './MedicationsList';
import {theme} from 'src/styles';
import {confirmConsumptionThunk} from 'src/redux/slices/medications/actions';

interface Props {
  hourId: number;
  isAlreadyConfirmed: boolean;
  isMatchingCurrentHour: boolean;
  isSuppliesDepleted: boolean;
  isInactive: boolean;
}

const DailyMedicationsListItem = ({
  hourId,
  isAlreadyConfirmed,
  isMatchingCurrentHour,
  isSuppliesDepleted,
  isInactive,
}: Props) => {
  const dispatch = useAppDispatch();
  const confirmAction = () => dispatch(confirmConsumptionThunk(hourId));

  return (
    <View style={[styles.container, {opacity: isInactive ? 0.5 : 1}]}>
      <StatusIndicator
        isInactive={isInactive}
        isAlreadyConfirmed={isAlreadyConfirmed}
      />
      <Pressable
        disabled={isSuppliesDepleted}
        onLongPress={confirmAction}
        android_ripple={theme.configs.full}
        style={styles.content_wrapper}>
        <View style={styles.section}>
          <StatusBar
            hourId={hourId}
            isAlreadyConfirmed={isAlreadyConfirmed}
            isSuppliesDepleted={isSuppliesDepleted}
          />
        </View>
        <SizedBox height={10} />
        <View style={[styles.section, styles.medications_container]}>
          <MedicationsList hourId={hourId} />
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 7,
    overflow: 'hidden',
  },
  content_wrapper: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  medications_container: {
    flexWrap: 'wrap',
  },
});

export default React.memo(DailyMedicationsListItem);
