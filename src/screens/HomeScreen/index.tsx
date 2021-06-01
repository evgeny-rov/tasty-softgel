import React, {useState} from 'react';
import {StatusBar, ScrollView, StyleSheet} from 'react-native';
import FloatingActionButton from '../../components/FloatingActionButton';
import DailyAssignments from './components/DailyAssignments';
import {theme, typography} from 'src/styles';
import {useDispatch} from 'react-redux';
import {showModalMedicine} from 'src/redux/entities/modal_medicine/modal_medicine.actions';

interface Props {
  navigation: any;
}

const HomeScreen = () => {
  const dispatch = useDispatch();

  const showModal = () => dispatch(showModalMedicine());

  return (
    <>
      <StatusBar translucent backgroundColor={'transparent'} />
      {/* <BgImage source={require('../../assets/images/bg_01.jpg')} /> */}
      <ScrollView>
        <DailyAssignments />
      </ScrollView>
      <FloatingActionButton onPress={showModal} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    borderTopLeftRadius: 30,
    borderTopEndRadius: 30,
    marginTop: 50,
    backgroundColor: 'rgba(76, 64, 94, 0.95)',
  },
  section: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  padded_amount: {
    paddingHorizontal: 50,
  },
  close_btn: {
    marginLeft: 20,
  },
  card_title: {...typography.styles.h1, flex: 1},
  input: {
    marginTop: 10,
    borderColor: theme.colors.primary,
    color: theme.colors.primary,
    padding: 5,
    borderBottomWidth: 1,
  },
});

export default HomeScreen;
