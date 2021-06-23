import React from 'react';
import {Pressable, View, Text, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType, Medicine} from 'src/types';
import {confirmConsumption} from 'src/redux/entities/consumptions/consumptions.actions';
import hourToTimeString from 'src/utils/hourToTimeString';
import Icon from '@components/Icon';
import {theme, typography} from 'src/styles';

interface Props {
  assignmentHour: number;
  medicines: Medicine[];
  isSuppliesDepleted: boolean;
  canBeConfirmed: boolean;
  isUIActive: boolean;
}

export default ({
  assignmentHour,
  medicines,
  isSuppliesDepleted,
  canBeConfirmed,
  isUIActive,
}: Props) => {
  const dispatch = useDispatch();

  const confirmAction = () =>
    dispatch(confirmConsumption(assignmentHour, medicines));

  const aggregatedContainerStyles = {
    ...styles.container,
    ...styles.container_shadow,
    backgroundColor:
      isUIActive && canBeConfirmed ? theme.colors.accent : 'transparent',
    shadowColor:
      isUIActive && canBeConfirmed ? theme.colors.accent_dark : 'transparent',
    opacity: isSuppliesDepleted ? 0.5 : 1,
  };

  return (
    <Pressable
      style={aggregatedContainerStyles}
      disabled={!canBeConfirmed}
      onPress={confirmAction}
      android_ripple={{color: theme.colors.accent}}>
      <View style={[styles.section, styles.header]}>
        <Text style={[typography.styles.body_bold, styles.header_text]}>
          {hourToTimeString(assignmentHour)}
        </Text>
        <Icon
          name="pills"
          color={canBeConfirmed ? theme.colors.primary : 'transparent'}
          size={20}
        />
      </View>
      <View style={[styles.section, styles.medicine_list_container]}>
        {medicines.map(({name, id}) => (
          <View key={id} style={styles.medicine_item_container}>
            <Text style={[typography.styles.body_bold]}>{name}</Text>
          </View>
        ))}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingVertical: 5,
  },
  container_shadow: {
    elevation: 10,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 3.84,
    shadowOpacity: 1,
  },
  section: {
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    justifyContent: 'space-between',
  },
  header_text: {
    fontSize: 12,
  },
  medicine_list_container: {
    flexWrap: 'wrap',
  },
  medicine_item_container: {
    paddingRight: 25,
  },
});
