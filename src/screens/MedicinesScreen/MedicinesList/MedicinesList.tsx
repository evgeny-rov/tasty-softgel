import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {useSelector} from 'react-redux';

import useModalMedicine from 'src/hooks/useModalMedicine';
import {getMedicinesWithAssignmentsHours} from 'src/redux/entities/medicines/medicines.selectors';
import MedicinesListItem from './MedicinesListItem';
import Icon from '@components/Icon';
import IconButton from '@components/IconButton';
import {common, theme, typography} from 'src/styles';
import {RootState} from 'src/redux/store';

const MedicinesList = () => {
  const {showModalNewMedicine} = useModalMedicine();
  const medicinesIds = useSelector(
    (state: RootState) => state.medicines.allIds,
  );

  return (
    <>
      <View style={common.styles.header}>
        <Text style={typography.styles.h1}>Ваши лекарства</Text>
        <IconButton onPress={showModalNewMedicine}>
          <Icon name="pills" color={theme.colors.primary} />
        </IconButton>
      </View>
      <ScrollView
        bounces
        showsVerticalScrollIndicator={false}
        overScrollMode={'never'}>
        {medicinesIds.map((id) => (
          <MedicinesListItem key={id} medicineId={id} />
        ))}
      </ScrollView>
    </>
  );
};

export default React.memo(MedicinesList);
