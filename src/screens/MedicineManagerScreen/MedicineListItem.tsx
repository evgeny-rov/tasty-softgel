import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Assignment, Medicine} from 'src/types';

import {theme, typography} from '@styles/';
import hourToTimeString from 'src/utils/hourToTimeString';
import Icon from '@components/Icon';
import {useNavigation} from '@react-navigation/core';
import {openMedicineModal} from 'src/navigation/helpers';

interface Props {
  medicine: Medicine;
  assignments: Assignment[];
}

const MedicineListItem = ({medicine, assignments}: Props) => {
  const assignmentsList = assignments
    .map(({hour}) => hourToTimeString(hour))
    .join(', ');

  return (
    <View style={styles.container}>
      <View style={styles.button_wrapper}>
        <Pressable
          style={styles.edit_button}
          android_ripple={theme.configs.ripple_contained}
          hitSlop={18}
          onPress={() => null}>
          <Icon name="quill" color={theme.colors.primary} size={18} />
        </Pressable>
      </View>
      <View style={styles.main_content_wrapper}>
        <Text style={typography.styles.body_bold} numberOfLines={1}>
          {medicine.name}
        </Text>
        <Text numberOfLines={1} style={typography.styles.body_sub_gray}>
          {assignmentsList || 'Прием не назначен'}
        </Text>
      </View>
      <View>
        <Text style={typography.styles.body_sm}>{medicine.count} шт.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  main_content_wrapper: {
    flex: 1,
    marginHorizontal: 15,
  },
  button_wrapper: {
    flex: 1,
    maxHeight: 40,
    maxWidth: 40,
    borderRadius: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  edit_button: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MedicineListItem;
