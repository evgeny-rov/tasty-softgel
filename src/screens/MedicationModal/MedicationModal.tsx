import 'react-native-get-random-values';
import {v4 as uuid} from 'uuid';
import React, {useEffect, useState} from 'react';
import {BackHandler, Dimensions, StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';

import {useAppSelector} from 'src/hooks/reduxHooks';
import useMedicationModal from 'src/hooks/useMedicationModal';
import useNonInitialRender from 'src/hooks/useNonInitialRender';
import MedicationModalContent from './MedicationModalContent';
import type {Medication} from 'src/types';

const MEDICATION_ID_PREFIX = 'med-';
const MED_DEFAULT_NAME = '';
const MED_DEFAULT_QUANTITY = 30;

const getAnimation = (isVisible: boolean) => {
  const screenHeight = Dimensions.get('window').height;

  const prevYPos = isVisible ? -screenHeight : 0;
  const nextYPos = isVisible ? 0 : -screenHeight;

  const prevOpacity = isVisible ? 0 : 1;
  const nextOpacity = isVisible ? 1 : 0;

  return {
    from: {bottom: prevYPos, opacity: prevOpacity},
    to: {bottom: nextYPos, opacity: nextOpacity},
  };
};

const getNewMedicationDraft = (): Medication => ({
  id: MEDICATION_ID_PREFIX + uuid(),
  name: MED_DEFAULT_NAME,
  quantity: MED_DEFAULT_QUANTITY,
});

const MedicationModal = () => {
  const {isVisible, data} = useAppSelector((state) => state.medication_modal);
  const {hideMedicationModal} = useMedicationModal();
  const isNonInitialRender = useNonInitialRender();
  const [medication, setMedication] = useState<Medication>(
    getNewMedicationDraft(),
  );

  useEffect(() => {
    if (isVisible) {
      setMedication(data ? data : getNewMedicationDraft());
    }

    const onBackButton = () => {
      if (isVisible) {
        hideMedicationModal();
        return true;
      }

      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackButton,
    );

    return backHandler.remove;
  }, [isVisible, hideMedicationModal]);

  return (
    <Animatable.View
      duration={400}
      animation={isNonInitialRender ? getAnimation(isVisible) : undefined}
      style={styles.container}>
      <MedicationModalContent
        medication={medication}
        isInEditMode={data !== null}
      />
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 50,
    flex: 1,
    bottom: -Dimensions.get('window').height,
    width: '100%',
    height: '100%',
  },
});

export default MedicationModal;
