import React from 'react';
import {View, Text} from 'react-native';
import {useAppDispatch, useAppSelector} from 'src/hooks/reduxHooks';
import {toggleNotificationsState} from 'src/redux/slices/preferences/actions';
import Icon from '@components/Icon';
import IconButton from '@components/IconButton';
import {common, typography, theme} from 'src/styles';

const Header = () => {
  const dispatch = useAppDispatch();
  const isNotificationsActive = useAppSelector(
    (state) => state.preferences.isNotificationsActive,
  );

  const toggleNotifications = () =>
    dispatch(toggleNotificationsState(!isNotificationsActive));

  return (
    <View style={common.styles.header}>
      <Text style={typography.styles.h1}>Ежедневный план</Text>
      <IconButton onPress={toggleNotifications}>
        <Icon
          name={isNotificationsActive ? 'bell' : 'bell_outline'}
          size={16}
          color={theme.colors.primary}
        />
      </IconButton>
    </View>
  );
};

export default Header;
