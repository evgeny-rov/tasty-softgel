import React, {useState} from 'react';
import {Pressable, View, Text, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import FlipCard from 'react-native-flip-card';

import {HOURS_AS_TIME_STRING} from '@constants/';
import {confirmConsumption} from 'src/redux/entities/daily_assignments/daily_assignments.actions';
import Icon from '@components/Icon';
import SizedBox from '@components/SizedBox';
import {common, theme, typography} from 'src/styles';
import {Medicine} from 'src/types';

interface Props {
  assignmentHour: number;
  medicines: Medicine[];
  isSuppliesDepleted: boolean;
  canBeConfirmed: boolean;
  isAlreadyConfirmed: boolean;
  currentDailyAssignmentsHour: number;
}

const MedicinesSublistItem = ({medicine}: {medicine: Medicine}) => {
  // todo: add some kind of indicator that medicine supply is depleted, probably animation

  return (
    <View style={styles.medicine_item_container}>
      <Text style={[typography.styles.body_bold]}>{medicine.name}</Text>
    </View>
  );
};

export default ({
  medicines,
  isSuppliesDepleted,
  assignmentHour,
  canBeConfirmed,
  isAlreadyConfirmed,
  currentDailyAssignmentsHour,
}: Props) => {
  const dispatch = useDispatch();
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  const confirmAction = () => {
    dispatch(
      confirmConsumption(
        assignmentHour,
        medicines,
        assignmentHour > currentDailyAssignmentsHour,
      ),
    );
    setIsCardFlipped(false);
  };

  const shouldShowStatusIcon = canBeConfirmed || isAlreadyConfirmed;

  const CardFrontSide = () => (
    <Pressable
      disabled={!canBeConfirmed}
      onPress={() => setIsCardFlipped(true)}>
      <View style={[styles.section, styles.status]}>
        <View style={[common.styles.row, common.styles.centered_vertically]}>
          <Text style={styles.header_text}>
            {HOURS_AS_TIME_STRING[assignmentHour]}
          </Text>
          {isSuppliesDepleted && (
            <Text
              style={[styles.header_text, {marginLeft: 20}]}
              adjustsFontSizeToFit>
              Лекарства закончились
            </Text>
          )}
        </View>
        <SizedBox height={0.5} style={styles.header_line} />
        <Icon
          name={isAlreadyConfirmed ? 'done' : 'pills'}
          color={shouldShowStatusIcon ? theme.colors.primary : 'transparent'}
        />
      </View>
      <View style={[styles.section, styles.medicine_list_container]}>
        {medicines.map((medicine) => (
          <MedicinesSublistItem key={medicine.id} medicine={medicine} />
        ))}
      </View>
    </Pressable>
  );

  // to-do > add flip icon on the backside
  const CardBackSide = () => (
    <Pressable onPress={() => setIsCardFlipped(false)}>
      <View style={[styles.section, styles.status]}>
        <View style={[common.styles.row, common.styles.centered_vertically]}>
          <Text style={styles.header_text}>
            {HOURS_AS_TIME_STRING[assignmentHour]}
          </Text>
        </View>
        <Icon name={'arrow_up'} color={theme.colors.primary} />
      </View>
      <View style={styles.section}>
        <Pressable onPress={confirmAction}>
          <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            style={[
              typography.styles.body_bold,
              {color: theme.colors.accent2},
            ]}>
            Подтвердить прием
          </Text>
        </Pressable>
      </View>
    </Pressable>
  );

  return (
    <FlipCard
      flip={isCardFlipped}
      clickable={false}
      alignHeight
      flipVertical
      friction={15}
      style={[styles.container, {opacity: isSuppliesDepleted ? 0.5 : 1}]}>
      <CardFrontSide />
      <CardBackSide />
    </FlipCard>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingVertical: 10,
  },
  section: {
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  status: {
    justifyContent: 'space-between',
  },
  header_text: {
    ...typography.styles.body_bold,
    fontSize: 12,
  },
  header_line: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginHorizontal: 20,
  },
  medicine_list_container: {
    flexWrap: 'wrap',
  },
  medicine_item_container: {
    paddingRight: 25,
  },
});
