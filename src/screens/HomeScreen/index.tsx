import React, {useState} from 'react';
import {
  StatusBar,
  ScrollView,
  Modal,
  View,
  Pressable,
  Text,
  StyleSheet,
  TextInput,
  Keyboard,
} from 'react-native';
import {StackNavigationHelpers} from '@react-navigation/stack/src/types';
import FloatingActionButton from '../../components/FloatingActionButton';
import BgImage from '../../components/BgImage';
import DailyAssignments from './components/DailyAssignments';
import {openMedicineModal} from '../../navigation/helpers';
import {useNavigation} from '@react-navigation/core';
import Icon from '@components/Icon';
import {common, theme, typography} from 'src/styles';
import SizedBox from '@components/SizedBox';

interface Props {
  navigation: any;
}

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');

  const renderModal = () => {
    return (
      <Modal
        animationType="slide"
        // style={{height: 50}}
        hardwareAccelerated
        transparent
        supportedOrientations={['portrait']}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.container}>
          <View style={styles.section}>
            <Text style={styles.card_title} numberOfLines={1}>
              Новое лекарство
            </Text>
            <Pressable
              android_ripple={theme.configs.ripple_sm}
              style={styles.close_btn}
              onPress={() => setModalVisible(false)}
              hitSlop={25}>
              <Icon name="clear" color={theme.colors.primary} size={20} />
            </Pressable>
          </View>
          <SizedBox height={60} />
          <View style={styles.section}>
            <View style={common.styles.flex}>
              <Text style={typography.styles.h2}>Наименование:</Text>
              <TextInput
                style={styles.input}
                autoCapitalize="words"
                value={name}
                onChangeText={setName}
                // onSubmitEditing={handleSubmit}
                blurOnSubmit
              />
            </View>
          </View>
          <SizedBox height={60} />
          <View style={styles.section}>
            <View style={common.styles.flex}>
              <Text style={typography.styles.h2}>Наименование:</Text>
              <TextInput
                style={styles.input}
                autoCapitalize="words"
                value={name}
                onChangeText={setName}
                // onSubmitEditing={handleSubmit}
                blurOnSubmit
              />
            </View>
          </View>
          <SizedBox height={60} />
          <View style={styles.section}>
            <View style={common.styles.flex}>
              <Text style={typography.styles.h2}>Наименование:</Text>
              <TextInput
                style={styles.input}
                autoCapitalize="words"
                value={name}
                onChangeText={setName}
                // onSubmitEditing={handleSubmit}
                blurOnSubmit
              />
            </View>
          </View>
          <SizedBox height={60} />
          <View style={styles.section}>
            <View style={common.styles.flex}>
              <Text style={typography.styles.h2}>Наименование:</Text>
              <TextInput
                style={styles.input}
                autoCapitalize="words"
                value={name}
                onChangeText={setName}
                // onSubmitEditing={handleSubmit}
                blurOnSubmit
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <>
      <StatusBar translucent backgroundColor={'transparent'} />
      <BgImage source={require('../../assets/images/bg_01.jpg')} />
      {renderModal()}
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
