import {StyleSheet} from 'react-native';

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
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  closebtn: {
    padding: 15,
    borderRadius: 100,
  },
  picker: {
    width: 80,
    height: 100,
  },
});

const formStyles = StyleSheet.create({
  input: {
    marginTop: 10,
    borderColor: '#fff',
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    color: '#fff',
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 50,
  },
  buttonText: {
    fontWeight: '700',
    color: 'black',
  },
});

export {formStyles, styles};
