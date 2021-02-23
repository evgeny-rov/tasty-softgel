import React, {useState} from 'react';
import {ImageBackground, StatusBar, StyleSheet, Text, View} from 'react-native';
import FloatingActionButton from '../components/FloatingActionButton';
import MedicineModal from '../components/MedicineModal';
import SizedBox from '../components/SizedBox';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    alignSelf: 'stretch',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingVertical: 50,
    paddingHorizontal: 35,
    borderBottomRightRadius: 70,
  },
  cardSection: {
    flexDirection: 'row',
    flex: 0,
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#fff',
  },
  cardText: {
    textAlign: 'right',
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  active: {
    color: '#ff9494',
  },
});

const HomeScreen: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <StatusBar translucent backgroundColor={'transparent'} />
      <ImageBackground
        source={require('../assets/images/bg2.png')}
        style={styles.flex}>
        <View style={styles.container}>
          <Text style={styles.cardTitle}>Today's pill plan</Text>
          <SizedBox height={35} />
          <View style={styles.cardSection}>
            <Text style={{...styles.cardText, ...styles.active}}>10:00</Text>
            <SizedBox width={50} />
            <View style={styles.flex}>
              <Text style={{...styles.cardText, ...styles.active}}>
                Aertal, Nise, Combucha, Asskilla
              </Text>
            </View>
          </View>
          <SizedBox height={25} />
          <View style={styles.cardSection}>
            <Text style={styles.cardText}>21:00</Text>
            <SizedBox width={50} />
            <View style={styles.flex}>
              <Text style={styles.cardText}>
                Aertal, Nise, Combucha, Asskilla
              </Text>
            </View>
          </View>
        </View>
        <FloatingActionButton onPress={() => setModalVisible(true)} />
        <MedicineModal
          modalVisible={modalVisible}
          setVisibility={setModalVisible}
        />
      </ImageBackground>
    </>
  );
};

export default HomeScreen;
