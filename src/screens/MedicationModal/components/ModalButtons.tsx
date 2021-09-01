import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {theme, typography} from 'src/styles';

type Props = {
  disabled: boolean;
  onRemove?: () => void;
  onSubmit: () => void;
};

const ModalButtons = ({disabled, onRemove, onSubmit}: Props) => {
  const opacity = disabled ? 0.3 : 1;

  return (
    <View style={styles.wrapper}>
      <Pressable hitSlop={20} disabled={disabled} onPress={onSubmit}>
        <Text style={[typography.styles.body_bold, {opacity}]}>
          Сохранить
        </Text>
      </Pressable>
      {onRemove && (
        <Pressable hitSlop={20} onPress={onRemove}>
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

export default React.memo(ModalButtons);
