import {StyleSheet} from 'react-native';

const textStyles = StyleSheet.create({
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
    backgroundColor: 'rgba(0, 0, 100, 0.5)',
  },
  closebtn: {
    padding: 15,
    borderRadius: 100,
  },
});

const formStyles = StyleSheet.create({
  label: {
    fontWeight: '700',
    color: 'white',
    fontSize: 16,
  },
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

export {formStyles, textStyles, styles};