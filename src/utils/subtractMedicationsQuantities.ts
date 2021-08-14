import type {Medication} from 'src/types';

const subtractMedicationsQuantites = (medications: Medication[]) => {
  return medications.reduce<{[id: string]: Medication}>((acc, medication) => {
    return {
      ...acc,
      [medication.id]: {
        ...medication,
        quantity: Math.max(0, medication.quantity - 1),
      },
    };
  }, {});
};

export default subtractMedicationsQuantites;