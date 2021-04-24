import React from 'react';
import {View, Text, Pressable} from 'react-native';
import SizedBox from '@components/SizedBox';
import {common, theme, typography} from 'src/styles';
import {useDispatch, useSelector} from 'react-redux';
import hourToTimeString from 'src/utils/hourToTimeString';
import {byHourMedicinesSelector} from 'src/redux/entities/assignments/assignments.selectors';
import {AppStateType, Medicine} from 'src/types';
import {confirmConsumption} from 'src/redux/entities/consumptions/consumptions.actions';
import Icon from '@components/Icon';

const AssignedItem = ({
  hour,
  medicines,
  isActive,
  canBeConfirmed,
}: {
  hour: number;
  medicines: Medicine[];
  isActive: boolean;
  canBeConfirmed: boolean;
}) => {
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
      style={{
        position: 'absolute',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: isActive ? theme.colors.accent2 : 'rgba(0, 0, 0, 0.1)',
        width: 34,
        height: 34,
        borderRadius: 100,
      }}
      android_ripple={theme.configs.ripple_xs}
      hitSlop={15}
      onPress={confirmAction}>
      <Icon name="pills" color={theme.colors.primary} size={18} />
    </Pressable>
  );

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: 15,
      }}>
      <Text style={[typography.styles.body_bold, textColor]}>
        {hourToTimeString(Number(hour))}
      </Text>
      <SizedBox width={80} style={common.styles.centered}>
        {canBeConfirmed && confirmationBtn}
      </SizedBox>
      <Text
        style={[
          typography.styles.body_bold,
          {textAlign: 'right', flex: 1, ...textColor},
        ]}>
        {medicinesNames.join(', ')}
      </Text>
    </View>
  );
};

const DailyConsumption = () => {
  const assignments = useSelector(byHourMedicinesSelector);

  return (
    <View style={styles.container}>
      <Text style={typography.styles.h1}>Ежедневный план</Text>
      <SizedBox height={35} />
      <View>
        {assignments.map((assignmentData, idx) => (
          <AssignedItem key={idx} {...assignmentData} />
        ))}
      </View>
    </View>
  );
};

const styles = {
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    paddingVertical: 50,
    paddingHorizontal: 35,
    borderBottomRightRadius: 70,
    // maxHeight: '80%',
  },
};

export default DailyConsumption;
