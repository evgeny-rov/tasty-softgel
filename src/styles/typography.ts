import {StyleSheet} from 'react-native';
import {theme} from './theme';

const styles = StyleSheet.create({
  h1: {
    color: theme.colors.primary,
    fontSize: theme.size.l,
    fontWeight: 'bold',
  },
  h2: {
    color: theme.colors.primary,
    fontSize: theme.size.ml,
    fontWeight: 'bold',
  },
  h3: {
    color: theme.colors.primary,
    fontSize: theme.size.m,
    fontWeight: 'bold',
  },
  body: {
    color: theme.colors.primary,
    fontWeight: '500',
    fontSize: theme.size.m,
  },
  body_bold: {
    color: theme.colors.primary,
    fontWeight: '700',
    fontSize: theme.size.m,
  },
  subtext: {
    color: theme.colors.primary,
    fontWeight: 'bold',
    fontSize: theme.size.sm,
  },
  subtext_secondary: {
    color: theme.colors.secondary,
    fontSize: theme.size.sm,
    fontWeight: '500',
  },
});

export {styles};
