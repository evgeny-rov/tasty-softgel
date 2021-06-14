import React from 'react';
import {Pressable, View, Text, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from 'src/types';
import {confirmConsumption} from 'src/redux/entities/consumptions/consumptions.actions';
import hourToTimeString from 'src/utils/hourToTimeString';
import Icon from '@components/Icon';
import {theme, typography} from 'src/styles';

interface Props {
  hour: number;
  medicinesIds: string[];
  isActive: boolean;
  canBeConfirmed: boolean;
}

export default ({hour, medicinesIds, isActive, canBeConfirmed}: Props) => {
  const medicines = useSelector((state: AppStateType) =>
    medicinesIds.map((id) => state.medicines.byId[id]),
  );
  const dispatch = useDispatch();

  const confirmAction = () => dispatch(confirmConsumption(hour, medicinesIds));

  const activeContainerStyles = {
    ...styles.container_shadow,
    backgroundColor: theme.colors.accent,
  };

  return (
    <Pressable
      style={[styles.container, isActive && canBeConfirmed && activeContainerStyles]}
      disabled={!canBeConfirmed}
      onPress={confirmAction}
      android_ripple={{color: theme.colors.accent}}>
      <View style={[styles.section, styles.header]}>
        <Text style={[typography.styles.body_bold, styles.header_text]}>
          {hourToTimeString(Number(hour))}
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
    paddingVertical: 10,
  },
  container_shadow: {
    elevation: 10,
    shadowColor: theme.colors.accent_dark,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 1,
    shadowRadius: 3.84,
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
