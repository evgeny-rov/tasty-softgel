import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import SizedBox from './SizedBox';
import {common, theme, typography} from 'src/styles';

type Action = {
  content: string;
  onPress: () => void;
};

type Props = {
  heading: string;
  message: string;
  actions?: Action[];
};

const EmptyState = ({heading, message, actions}: Props) => {
  const renderActions = () => {
    return (
      actions &&
      actions.map(({content, onPress}, idx) => (
        <View key={idx} style={{flex: idx, alignItems: 'flex-end'}}>
          <Text style={styles.action_text} onPress={onPress}>
            {content}
          </Text>
        </View>
      ))
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <View style={common.styles.flex}>
          <Text style={typography.styles.h2}>{heading}</Text>
          <SizedBox height={5} />
          <Text style={typography.styles.h3}>{message}</Text>
        </View>
        <Image
          style={styles.image}
          source={require('../assets/images/helper.png')}
        />
      </View>
      <SizedBox height={15} />
      <View style={styles.actions_container}>{renderActions()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: 200,
    paddingHorizontal: 40,
    paddingVertical: 30,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    ...common.styles.row,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'contain',
    width: 60,
    height: 60,
    marginLeft: 20,
    opacity: 0.8,
  },
  actions_container: {
    flex: 1,
    flexDirection: 'row',
  },
  action_text: {
    ...typography.styles.body_bold,
    color: theme.colors.accent2,
  },
});

export default EmptyState;
