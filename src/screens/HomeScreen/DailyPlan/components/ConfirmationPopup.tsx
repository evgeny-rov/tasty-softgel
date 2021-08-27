import Icon from '@components/Icon';
import React from 'react';
import {StyleSheet, ViewProps, ViewStyle, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {common, theme} from 'src/styles';

const ConfirmationPopUp = ({
  myRef,
}: {
  myRef: React.RefObject<
    Animatable.AnimatableComponent<ViewProps, ViewStyle> & View
  >;
}) => {
  return (
    <Animatable.View
      style={styles.confirm_popup}
      pointerEvents="none"
      useNativeDriver
      ref={myRef}>
      <Icon name="done" size={40} color={theme.colors.primary} />
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  confirm_popup: {
    ...common.styles.centered,
    opacity: 0,
    position: 'absolute',
    zIndex: 10,
    width: '100%',
    height: '100%',
  },
});

export default React.memo(ConfirmationPopUp);
