import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    borderTopLeftRadius: 30,
    borderTopEndRadius: 30,
    marginTop: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  section: {
    flex: 0,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  centeredVertically: {
    alignItems: 'center',
  },
  picker: {
    width: 80,
    height: 100,
  },
  flex_end: {
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
  },
  amountPad: {
    paddingHorizontal: 40,
  },
});

const formStyles = StyleSheet.create({
  input: {
    marginTop: 10,
    borderColor: '#fff',
    borderBottomWidth: 1,
    padding: 5,
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
