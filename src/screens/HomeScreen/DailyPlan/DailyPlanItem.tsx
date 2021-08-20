import React, {useCallback} from 'react';
import {Pressable, View, StyleSheet, ViewStyle, ViewProps} from 'react-native';
import {shallowEqual} from 'react-redux';
import * as Animatable from 'react-native-animatable';

import {useAppDispatch, useAppSelector} from 'src/hooks/reduxHooks';
import {confirmConsumptionThunk} from 'src/redux/slices/medications/actions';
import {getDailyPlanEntryByHourId} from 'src/redux/slices/scheduled_medications/selectors';
import useAnimatable from 'src/hooks/useAnimatable';
import SizedBox from '@components/SizedBox';
import Icon from '@components/Icon';
import StatusIndicator from './components/StatusIndicator';
import StatusBar from './components/StatusBar';
import MedicationsList from './components/MedicationsList';
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

  const {ref: confirmPopupRef, tryAnimation} = useAnimatable<
    ViewProps,
    ViewStyle
  >();

  const confirmAction = useCallback(() => {
    dispatch(confirmConsumptionThunk(hourId));
    tryAnimation('bounceIn', 1000)?.then(() => tryAnimation('bounceOut', 300));
  }, [hourId]);

  const shouldSeekAttention =
    isMatchingCurrentHour && !isAlreadyConfirmed && !isInactive;
  const animationProps = shouldSeekAttention ? seekerAnimationProps : null;
  const opacity = isInactive ? 0.5 : 1;

  return (
    <Animatable.View {...animationProps} style={[styles.container, {opacity}]}>
      <Animatable.View
        pointerEvents="none"
        useNativeDriver
        ref={confirmPopupRef}
        style={styles.confirm_popup}>
        <Icon name="done" size={30} color={theme.colors.primary} />
      </Animatable.View>
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
    </Animatable.View>
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
  confirm_popup: {
    opacity: 0,
    position: 'absolute',
    zIndex: 10,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  medications_container: {
    flexWrap: 'wrap',
  },
});

export default React.memo(DailyPlanItem);
