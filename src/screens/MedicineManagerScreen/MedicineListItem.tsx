import React from 'react';
import {Button, Pressable, StyleSheet, Text, View} from 'react-native';
import {Medicine} from 'src/types';

import {common, theme, typography} from '@styles/';
import hourToTimeString from 'src/utils/hourToTimeString';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from '@components/Icon';
import {useNavigation} from '@react-navigation/core';

const MedicineListItem = (medicine: Medicine) => {
  const navigation = useNavigation();
  const assignmentsAsHoursString = medicine.assignments
    .sort()
    .map(hourToTimeString)
    .join(', ');

  const openMedicineCard = () =>
    navigation.navigate('modal_medicine_card', {
      medicine,
    });

  const button = (
    <Pressable
      style={{
        // position: 'absolute',
        marginRight: 15,
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        width: 40,
        height: 40,
        borderRadius: 100,
      }}
      android_ripple={theme.configs.ripple_sm}
      hitSlop={15}
      onPress={openMedicineCard}>
      <Icon name="quill" color={theme.colors.primary} size={18} />
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View
        style={[
          common.styles.row,
          common.styles.spaced,
          common.styles.centered,
        ]}>
        {button}
        <View style={common.styles.flex}>
          <Text style={typography.styles.body_bold}>{medicine.name}</Text>
          <ScrollView
            style={styles.padded}
            horizontal
            showsHorizontalScrollIndicator={false}>
            <Text numberOfLines={1} style={typography.styles.body_sub_gray}>
              {assignmentsAsHoursString}
            </Text>
          </ScrollView>
        </View>
        <View>
          <Text style={typography.styles.body_sm}>
            {medicine.currentAmount} шт.
          </Text>
        </View>
      </View>
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
