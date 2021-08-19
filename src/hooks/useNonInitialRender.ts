import {useRef, useEffect} from 'react';

const useNonInitialRender = () => {
  const isMountedRef = useRef(false);
  useEffect(() => {
    isMountedRef.current = true;
  }, []);
  return isMountedRef.current;
};

export default useNonInitialRender;
