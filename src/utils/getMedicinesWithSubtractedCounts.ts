import {Medicine} from 'src/types';

export default (medicines: Medicine[]) => {
  return medicines.reduce<{[id: string]: Medicine}>((acc, medicine) => {
    return {
      ...acc,
      [medicine.id]: {
        ...medicine,
        count: Math.max(0, medicine.count - 1),
      },
    };
  }, {});
};
