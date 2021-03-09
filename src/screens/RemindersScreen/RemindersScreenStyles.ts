import {StyleSheet} from 'react-native';

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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 0,
  },
  col: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
});

export const styles = StyleSheet.create({
  image: {flex: 1, justifyContent: 'center'},
  container: {flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.3)'},
  header: {
    flex: 0,
    paddingHorizontal: 20,
    paddingTop: 15,
    marginTop: 20,
  },
  pickerContainer: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
  },
  listContainer: {
    flex: 1,
    backgroundColor: 'rgba(23, 23, 77, 0.479)',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
  },
});
