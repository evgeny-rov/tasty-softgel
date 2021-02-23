import React from 'react';

import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import SizedBox from './SizedBox';

interface Props {
  customStyles?: ViewStyle;
}

const Card: React.FC<Props> = ({children, customStyles = {}}) => {
  return <View style={{...styles.container, ...customStyles}}>{children}</View>;
};

const HardCodedCard: React.FC = () => {
  return (
    <Card>
      <View>
        <Text style={styles.cardTitle}>План на сегодня</Text>
        <SizedBox height={35} />
        <View style={styles.cardSection}>
          <Text style={styles.cardText}>10:00</Text>
          <SizedBox width={50} />
          <View style={styles.cardList}>
            <Text style={styles.cardText}>
              Aertal, Nise, Poopice, Arkanto, PisscaLanao
            </Text>
          </View>
        </View>
        <SizedBox height={25} />
        <View style={styles.cardSection}>
          <Text style={styles.cardText}>10:00</Text>
          <SizedBox width={50} />
          <View style={styles.cardList}>
            <Text style={styles.cardText}>
              Aertal, Nise, Poopice, Arkanto, PisscaLanao
            </Text>
          </View>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginHorizontal: 15,
    padding: 20,
    flex: 1,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  cardSection: {
    flexDirection: 'row',
    flex: 0,
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardList: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#b288ce',
  },
  cardText: {
    textAlign: 'right',
    fontSize: 16,
    fontWeight: '700',
    color: '#d4d4d4',
  },
  blurView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export {Card, HardCodedCard};
