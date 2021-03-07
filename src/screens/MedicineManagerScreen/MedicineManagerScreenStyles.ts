import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginTop: 70,
    flex: 1,
    padding: 30,
    borderTopLeftRadius: 30,
    borderTopEndRadius: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  flex: {
    flex: 1,
  },
  bgImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    flex: 1,
  },
});

export const textStyles = StyleSheet.create({
  h1: {
    color: 'white',
    fontWeight: '800',
    fontSize: 22,
  },
  h2: {
    color: 'white',
    fontWeight: '800',
    fontSize: 16,
  },
});

export const medicineListStyles = StyleSheet.create({
  title: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
  subtitle: {
    color: 'grey',
    fontWeight: '500',
    fontSize: 12,
  },
  reminderTime: {
    color: 'white',
    fontWeight: '700',
    fontSize: 14,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  col: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
});