import React, {useCallback} from 'react';
import {Pressable, View, StyleSheet, ViewStyle, ViewProps} from 'react-native';
import {shallowEqual} from 'react-redux';
import * as Animatable from 'react-native-animatable';

import {useAppDispatch, useAppSelector} from 'src/hooks/reduxHooks';
import {confirmConsumptionThunk} from 'src/redux/slices/medications/actions';
import {getDailyPlanEntryByHourId} from 'src/redux/slices/scheduled_medications/selectors';
import useAnimatable from 'src/hooks/useAnimatable';
import SizedBox from '@components/SizedBox';
import StatusIndicator from './components/StatusIndicator';
import StatusBar from './components/StatusBar';
import MedicationsList from './components/MedicationsList';
import ConfirmationPopup from './components/ConfirmationPopup';
import {theme} from 'src/styles';

const seekerAnimationProps: Animatable.View['defaultProps'] = {
  animation: 'pulse',
  direction: 'alternate',
  duration: 1000,
  iterationCount: 'infinite',
  useNativeDriver: true,
};

const DailyPlanItem = ({hourId}: {hourId: number}) => {
  const dispatch = useAppDispatch();
  const {
    isAlreadyConfirmed,
    isInactive,
    isMatchingCurrentHour,
    isSuppliesDepleted,
  } = useAppSelector(getDailyPlanEntryByHourId(hourId), shallowEqual);

  const innerWrapper = useAnimatable<ViewProps, ViewStyle>();
  const confirmPopUpAnims = useAnimatable<ViewProps, ViewStyle>();

  const shouldSeekAttention =
    isMatchingCurrentHour && !isAlreadyConfirmed && !isInactive;
  const containerAnimationProps = shouldSeekAttention
    ? seekerAnimationProps
    : null;
  const opacity = isInactive ? 0.5 : 1;

  const confirmAction = useCallback(() => {
    dispatch(confirmConsumptionThunk(hourId));
    innerWrapper.ref.current?.transition({opacity: 1}, {opacity: 0.2}, 400);
    confirmPopUpAnims.use('bounceIn', 1000)?.then(() => {
      confirmPopUpAnims.use('bounceOut', 300);

      innerWrapper.ref.current?.transition({opacity: 0.2}, {opacity: 1}, 400);
    });
  }, [hourId]);

  return (
    <View {...containerAnimationProps} style={[styles.container, {opacity}]}>
      <ConfirmationPopup myRef={confirmPopUpAnims.ref} />
      <Animatable.View
        ref={innerWrapper.ref}
        style={styles.inner_wrapper}
        useNativeDriver>
        <StatusIndicator
          isInactive={isInactive}
          isAlreadyConfirmed={isAlreadyConfirmed}
        />
        <Pressable
          disabled={isSuppliesDepleted}
          onLongPress={confirmAction}
          android_ripple={theme.configs.full}
          style={styles.main_content}>
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
      </Animatable.View>
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
  inner_wrapper: {
    backgroundColor: 'transparent',
  },
  main_content: {
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

export default React.memo(DailyPlanItem);
