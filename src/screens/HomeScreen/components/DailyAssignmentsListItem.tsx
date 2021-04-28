import React from 'react';
import {Pressable, View, Text, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Medicine, AppStateType} from 'src/types';
import {theme, typography, common} from 'src/styles';
import SizedBox from '@components/SizedBox';
import Icon from '@components/Icon';
import {confirmConsumption} from 'src/redux/entities/consumptions/consumptions.actions';
import hourToTimeString from 'src/utils/hourToTimeString';

interface Props {
  hour: number;
  medicines: Medicine[];
  isActive: boolean;
  canBeConfirmed: boolean;
}

export default ({hour, medicines, isActive, canBeConfirmed}: Props) => {
  const dispatch = useDispatch();
  const medicinesNames = useSelector((state: AppStateType) =>
    medicines.map(({id}) => state.medicines.byId[id].name),
  );

  const confirmAction = () =>
    dispatch(
      confirmConsumption(
        hour,
        medicines.map((med) => med.id),
      ),
    );

  const textColor = {
    color: isActive ? theme.colors.accent2 : theme.colors.primary,
  };

  const confirmationBtn = (
    <Pressable
      style={styles.button}
      android_ripple={theme.configs.ripple_xs}
      hitSlop={15}
      onPress={confirmAction}>
      <Icon name="pills" color={theme.colors.primary} size={18} />
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text style={[typography.styles.body_bold, textColor]}>
        {hourToTimeString(Number(hour))}
      </Text>
      <View style={styles.button_container}>
        {canBeConfirmed && confirmationBtn}
      </View>
      <Text style={[styles.items, textColor]}>{medicinesNames.join(', ')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 15,
  },
  items: {
    flex: 2,
    textAlign: 'right',
    ...typography.styles.body_bold,
  },
  button_container: {
    marginHorizontal: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    position: 'absolute',
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 35,
    height: 35,
    backgroundColor: 'rgba(241, 184, 119, 0.384)',
    borderRadius: 100,
  },
});
