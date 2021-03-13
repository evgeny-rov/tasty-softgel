import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Medicine} from 'src/types';

import {common, typography} from '@styles/';
import hourToTimeString from 'src/utils/hourToTimeString';
import {ScrollView} from 'react-native-gesture-handler';

const MedicineListItem = ({name, currentAmount, reminders}: Medicine) => {
  const remindersHoursString = reminders.map(hourToTimeString).sort().join(', ');

  return (
    <View style={styles.container}>
      <View style={[common.styles.row, common.styles.spaced]}>
        <View style={common.styles.flex}>
          <Text style={typography.styles.body_bold}>{name}</Text>
        </View>
        <View>
          <Text style={typography.styles.body_sm}>{currentAmount} шт.</Text>
        </View>
      </View>
      <ScrollView
        style={styles.padded}
        horizontal
        showsHorizontalScrollIndicator={false}>
        <Text numberOfLines={1} style={typography.styles.body_sub_gray}>
          {remindersHoursString}
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  padded: {
    paddingTop: 5,
  },
});

export default MedicineListItem;
