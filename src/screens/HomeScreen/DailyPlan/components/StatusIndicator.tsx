import React from 'react';
import {StyleSheet, View} from 'react-native';
import {theme} from 'src/styles';

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
      <View style={{...styles.status_indicator, backgroundColor, opacity}} />
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
