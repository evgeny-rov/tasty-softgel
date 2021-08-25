import React from 'react';
import {View, Image, Text, StyleSheet, Pressable} from 'react-native';
import SizedBox from './SizedBox';
import {theme, typography, common} from 'src/styles';

type Action = {
  content: string;
  onPress: () => void;
};

type Props = {
  heading: string;
  message: string;
  action?: Action;
  secondaryAction?: Action;
};

const EmptyState = ({heading, message, action, secondaryAction}: Props) => {
  const renderAction = ({content, onPress}: Action) => (
    <Pressable style={styles.action_container}>
      <Text style={styles.action_text} onPress={onPress}>
        {content}
      </Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../assets/images/helper.png')}
      />
      <Text style={[typography.styles.h2, styles.text_content]}>{heading}</Text>
      <SizedBox height={5} />
      <Text style={[typography.styles.h3, styles.text_content]}>{message}</Text>
      <SizedBox height={15} />
      {action && renderAction(action)}
      {secondaryAction && renderAction(secondaryAction)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...common.styles.flex,
    ...common.styles.centered,
    paddingHorizontal: 40,
    paddingVertical: 30,
  },
  image: {
    resizeMode: 'contain',
    width: 60,
    height: 60,
    margin: 20,
    opacity: 0.8,
  },
  action_container: {
    paddingVertical: 10,
  },
  text_content: {
    textAlign: 'center',
  },
  action_text: {
    ...typography.styles.body_bold,
    color: theme.colors.accent2,
  },
});

export default React.memo(EmptyState);
