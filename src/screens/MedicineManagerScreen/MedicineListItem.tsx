import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Medicine} from 'src/types';

import {common, typography} from '@styles/';

const MedicineListItem = ({name, currentAmount}: Medicine) => {
  return (
    <View style={styles.container}>
      <View style={common.styles.col}>
        <Text style={typography.styles.body}>{name}</Text>
        <Text style={typography.styles.body_sub_gray}>{currentAmount} шт.</Text>
      </View>
      <Text style={typography.styles.body_bold}>under dev</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
});

export default MedicineListItem;
