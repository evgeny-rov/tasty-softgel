import type {Medication} from 'src/types';

const MEDICATION_SUPPLY_DEPLETES_SOON_THRESHOLD = 6;
const MEDICATION_SUPPLY_LAST_ITEM = 1;

export default (medications: Medication[]) => {
  const resultingSupply = {
    total: 0,
    depletes_soon: [] as Medication[],
    depleted: [] as Medication[],
  };

  for (const medication of medications) {
    if (medication.quantity === MEDICATION_SUPPLY_DEPLETES_SOON_THRESHOLD) {
      resultingSupply.depletes_soon.push(medication);
    } else if (medication.quantity === MEDICATION_SUPPLY_LAST_ITEM) {
      resultingSupply.depleted.push(medication);
    }

    resultingSupply.total += medication.quantity;
  }

  return resultingSupply;
};
