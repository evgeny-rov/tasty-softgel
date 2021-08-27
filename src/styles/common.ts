import {StatusBar, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  col: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  screen_container: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 20,
  },
});

export {styles};
