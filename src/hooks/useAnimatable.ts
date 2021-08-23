import {useRef} from 'react';
import {View} from 'react-native';
import {AnimatableComponent, Animation} from 'react-native-animatable';

const useAnimatable = <T, S>() => {
  const ref = useRef<AnimatableComponent<T, S> & View>(null);

  const use = (animation: Animation, duration: number) => {
    const target: any = ref.current;

    if (target && target[animation]) {
      return target[animation](duration) as Promise<{
        finished: boolean;
      }>;
    }
    return null;
  };

  const animate = (params: Record<number, any>) => {
    const target: any = ref.current;

    if (target) {
      return target.animate(params) as Promise<{
        finished: boolean;
      }>;
    }

    return null;
  };

  return {ref, use, animate};
};

export default useAnimatable;
