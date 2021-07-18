import {StatusBar, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  spaced: {
    justifyContent: 'space-between',
  },
  col: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centered_vertically: {
    alignItems: 'center',
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
    marginVertical: 30,
  },
  absolutely_full: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: '100%',
  },
  flex_end: {
    flex: 1,
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
  },
});

export {styles};
