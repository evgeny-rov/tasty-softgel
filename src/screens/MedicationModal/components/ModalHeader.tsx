import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import Icon from '@components/Icon';
import {theme, typography} from 'src/styles';

type Props = {
  headerTitle: string;
  onClose: () => void;
};

const ModalHeader = ({headerTitle, onClose}: Props) => {
  return (
    <>
      <Text style={styles.card_title} numberOfLines={1}>
        {headerTitle}
      </Text>
      <Pressable
        android_ripple={theme.configs.ripple_sm}
        style={styles.close_btn}
        onPress={onClose}
        hitSlop={25}>
        <Icon name="clear" color={theme.colors.primary} />
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  close_btn: {
    marginLeft: 20,
  },
  card_title: {...typography.styles.h1, flex: 1},
});

export default React.memo(ModalHeader);
