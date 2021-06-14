import React from 'react';
import {Text} from 'react-native';
import Icon from '@components/Icon';
import RepeatedActionButton from '@components/RepeatedActionButton';
import {theme, typography} from 'src/styles';

const DEFAULT_MIN_VALUE = 0;
const DEFAULT_MAX_VALUE = 1000;

type Props = {
  count: number;
  setCount: (value: number) => void;
  minAmount?: number;
  maxAmount?: number;
};

const AmountCounter = ({
  count,
  setCount,
  minAmount = DEFAULT_MIN_VALUE,
  maxAmount = DEFAULT_MAX_VALUE,
}: Props) => {
  const incrementCount = () => count < maxAmount && setCount(count + 1);
  const decrementCount = () => count > minAmount && setCount(count - 1);

  return (
    <>
      <RepeatedActionButton action={decrementCount}>
        <Icon
          name="keyboard_arrow_left"
          color={theme.colors.primary}
          size={20}
        />
      </RepeatedActionButton>
      <Text style={[typography.styles.h2, {paddingHorizontal: 50}]}>
        {count}
      </Text>
      <RepeatedActionButton action={incrementCount}>
        <Icon
          name="keyboard_arrow_right"
          color={theme.colors.primary}
          size={20}
        />
      </RepeatedActionButton>
    </>
  );
};

export default AmountCounter;