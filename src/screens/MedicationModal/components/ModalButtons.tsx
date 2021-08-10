import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {theme, typography} from 'src/styles';

type Props = {
  isInEditMode: boolean;
  onRemove: () => void;
  onSubmit: () => void;
  disabled: boolean;
};

const ModalButtons = ({isInEditMode, disabled, onRemove, onSubmit}: Props) => {
  const submitButtonColor = disabled
    ? theme.colors.secondary_dark
    : theme.colors.primary;

  return (
    <View style={styles.wrapper}>
      <Pressable
        disabled={disabled}
        onPress={onSubmit}
        android_ripple={theme.configs.ripple_xl}>
        <Text style={[typography.styles.body_bold, {color: submitButtonColor}]}>
          Сохранить
        </Text>
      </Pressable>
      {isInEditMode && (
        <Pressable onPress={onRemove}>
          <Text style={styles.remove_btn_text}>Удалить</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  remove_btn_text: {
    ...typography.styles.body_bold,
    color: theme.colors.attention,
  },
});

export default ModalButtons;
