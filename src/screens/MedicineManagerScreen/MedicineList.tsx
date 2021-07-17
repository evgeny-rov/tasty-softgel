import EmptyState from '@components/EmptyState';
import React from 'react';
import {ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {getMedicinesWithAssignmentsHours} from 'src/redux/entities/medicines/medicines.selectors';
import MedicineListItem from './MedicineListItem';

const MedicineList = () => {
  const medicines = useSelector(getMedicinesWithAssignmentsHours);
  const isInEmptyState = medicines.length === 0;

  if (!isInEmptyState) {
    return (
      <ScrollView
        bounces
        showsVerticalScrollIndicator={false}
        overScrollMode={'never'}>
        {medicines.map(({medicine, assignments}) => (
          <MedicineListItem
            key={medicine.id}
            medicine={medicine}
            assignments={assignments}
          />
        ))}
      </ScrollView>
    );
  } else {
    return (
      <EmptyState
        heading={'Список лекарств пуст.'}
        message={'Добавьте новые лекарства'}
        actions={[{content: 'Добавить лекарство', onPress: () => null}]}
      />
    );
  }
};

export default MedicineList;
