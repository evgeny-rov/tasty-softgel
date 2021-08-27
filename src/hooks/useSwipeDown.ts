import {useRef} from 'react';
import {GestureResponderEvent} from 'react-native';

const useSwipeDown = (threshold: number, onSwipe: () => void) => {
  const touchStartPosition = useRef(0);

  const handleTouchStart = (e: GestureResponderEvent) => {
    touchStartPosition.current = e.nativeEvent.pageY;

    return true;
  };

  const handleTouchEnd = (e: GestureResponderEvent) => {
    const touchEndPosition = e.nativeEvent.pageY;
    const isThresholdCrossed =
      touchEndPosition - touchStartPosition.current >= threshold;

    if (isThresholdCrossed) onSwipe();

    touchStartPosition.current = 0;
  };

  return {
    onStartShouldSetResponder: handleTouchStart,
    onResponderRelease: handleTouchEnd,
  };
};

export default useSwipeDown;
