import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {HOURS_AS_TIME_STRING} from 'src/constants';
import Icon from '@components/Icon';
import SizedBox from '@components/SizedBox';
import {theme, typography} from 'src/styles';

const StatusBar = React.memo(
  ({
    hourId,
    isAlreadyConfirmed,
    isSuppliesDepleted,
  }: {
    hourId: number;
    isAlreadyConfirmed: boolean;
    isSuppliesDepleted: boolean;
  }) => {
    return (
      <>
        <Text style={styles.text}>{HOURS_AS_TIME_STRING[hourId]}</Text>
        <SizedBox width={20} />
        <Icon
          name={isAlreadyConfirmed ? 'done' : 'pills'}
          color={theme.colors.primary}
          size={12}
        />
        {isSuppliesDepleted && (
          <Text
            style={[styles.text, {marginLeft: 20}]}
            adjustsFontSizeToFit>
            Лекарства закончились
          </Text>
        )}
      </>
    );
  },
);

const styles = StyleSheet.create({
  text: {
    ...typography.styles.body_bold,
    fontSize: 12,
  },
});

export default StatusBar;
