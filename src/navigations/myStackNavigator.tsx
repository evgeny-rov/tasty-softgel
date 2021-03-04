import * as React from 'react';
import {Platform, View} from 'react-native';
import {
  useNavigationBuilder,
  createNavigatorFactory,
  DefaultNavigatorOptions,
  EventArg,
  StackRouter,
  StackRouterOptions,
  StackNavigationState,
  StackActions,
  ParamListBase,
  StackActionHelpers,
} from '@react-navigation/native';
import StackView from '@react-navigation/stack/src/views/Stack/StackView';
import type {
  StackNavigationConfig,
  StackNavigationOptions,
  StackNavigationEventMap,
  StackNavigationHelpers,
} from '@react-navigation/stack/src/types';
import generalStyles from '../styles/global';
import {ReactNode} from 'react';

type DefaultProps = DefaultNavigatorOptions<StackNavigationOptions> &
  StackRouterOptions &
  StackNavigationConfig;

interface Props extends DefaultProps {
  renderTabBar: (
    navigation: StackNavigationHelpers,
    state: StackNavigationState<ParamListBase>,
  ) => ReactNode;
}

function StackNavigator({
  initialRouteName,
  children,
  screenOptions,
  renderTabBar,
  ...rest
}: Props) {
  const defaultOptions = {
    gestureEnabled: Platform.OS === 'ios',
    animationEnabled:
      Platform.OS !== 'web' &&
      Platform.OS !== 'windows' &&
      Platform.OS !== 'macos',
  };

  const {state, descriptors, navigation} = useNavigationBuilder<
    StackNavigationState<ParamListBase>,
    StackRouterOptions,
    StackActionHelpers<ParamListBase>,
    StackNavigationOptions,
    StackNavigationEventMap
  >(StackRouter, {
    initialRouteName,
    children,
    screenOptions:
      typeof screenOptions === 'function'
        ? (...args) => ({
            ...defaultOptions,
            ...screenOptions(...args),
          })
        : {
            ...defaultOptions,
            ...screenOptions,
          },
  });

  React.useEffect(
    () =>
      navigation.addListener?.('tabPress', (e) => {
        const isFocused = navigation.isFocused();

        // Run the operation in the next frame so we're sure all listeners have been run
        // This is necessary to know if preventDefault() has been called
        requestAnimationFrame(() => {
          if (
            state.index > 0 &&
            isFocused &&
            !(e as EventArg<'tabPress', true>).defaultPrevented
          ) {
            // When user taps on already focused tab and we're inside the tab,
            // reset the stack to replicate native behaviour
            navigation.dispatch({
              ...StackActions.popToTop(),
              target: state.key,
            });
          }
        });
      }),
    [navigation, state.index, state.key],
  );

  return (
    <View style={generalStyles.flex}>
      <StackView
        {...rest}
        state={state}
        descriptors={descriptors}
        navigation={navigation}
      />
      {renderTabBar(navigation, state)}
    </View>
  );
}

export default createNavigatorFactory<
  StackNavigationState<ParamListBase>,
  StackNavigationOptions,
  StackNavigationEventMap,
  typeof StackNavigator
>(StackNavigator);
