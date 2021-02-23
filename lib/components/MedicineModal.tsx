import React from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import {CloseIcon} from './icons';

interface Props {
  modalVisible: boolean;
  setVisibility: Function;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    borderTopLeftRadius: 30,
    borderTopEndRadius: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  section: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textWhite: {
    color: 'white',
    fontWeight: '700',
    fontSize: 20,
  },
  closebtn: {
    padding: 15,
    borderRadius: 100,
  },
});

const MedicineModal: React.FC<Props> = ({modalVisible, setVisibility}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setVisibility(!modalVisible)}>
      <View style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.textWhite}>Add new medicine</Text>
          <Pressable
            android_ripple={{radius: 20, color: 'gray'}}
            onPress={() => setVisibility(false)}
            style={styles.closebtn}>
            <CloseIcon fill="#fff" width={12} height={12} />
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default MedicineModal;
