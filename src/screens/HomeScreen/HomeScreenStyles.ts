import {StyleSheet} from 'react-native';

export default StyleSheet.create({
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
