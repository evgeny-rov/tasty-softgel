import React, {useState} from 'react';
import {StatusBar, ScrollView, StyleSheet} from 'react-native';
import FloatingActionButton from '../../components/FloatingActionButton';
import BgImage from '../../components/BgImage';
import DailyAssignments from './components/DailyAssignments';
import {theme, typography} from 'src/styles';
import Modal from '../ModalMedicineCardScreen/Modal';

interface Props {
  navigation: any;
}

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <StatusBar translucent backgroundColor={'transparent'} />
      <BgImage source={require('../../assets/images/bg_01.jpg')} />
      <Modal
        isVisible={modalVisible}
        setModalVisible={setModalVisible}
        mode="new"
      />
      <ScrollView>
        <DailyAssignments />
      </ScrollView>
      <FloatingActionButton onPress={() => setModalVisible(true)} />
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
