import React from 'react';
import SizedBox from '@components/SizedBox';
import {theme} from 'src/styles';
import {StyleSheet} from 'react-native';

const StatusIndicator = React.memo(
  ({
    isInactive,
    isAlreadyConfirmed,
  }: {
    isInactive: boolean;
    isAlreadyConfirmed: boolean;
  }) => {
    const backgroundColor = isAlreadyConfirmed
      ? theme.colors.accent2
      : theme.colors.primary;
    const opacity = isInactive ? 0 : 1;

    return (
      <SizedBox style={[styles.status_indicator, {backgroundColor, opacity}]} />
    );
  },
);

const styles = StyleSheet.create({
  status_indicator: {
    position: 'absolute',
    left: 0,
    height: '100%',
    width: 5,
  },
});

export default StatusIndicator;
