import {useRef} from 'react';
import {View} from 'react-native';
import {
  AnimatableComponent,
  Animation,
  AnimatableAnimationMethods,
} from 'react-native-animatable';

const useAnimatable = <T, S>() => {
  const ref = useRef<AnimatableComponent<T, S> & View>(null);

  const tryAnimation = (animation: Animation, duration: number) => {
    const target: any = ref.current;

    if (target && target[animation]) {
      return target[animation](duration) as ReturnType<
        Exclude<AnimatableAnimationMethods[typeof animation], undefined>
      >;
    }
    return null;
  };

  return {ref, tryAnimation};
};

export default useAnimatable;
