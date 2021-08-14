import type {Medication} from 'src/types';

const MEDICINE_SUPPLY_DEPLETES_SOON_THRESHOLD = 6;
const MEDICINE_SUPPLY_LAST_ITEM = 1;

export default (medicines: Medication[]) => {
  const resultingSupply = {
    total: 0,
    depletes_soon: [] as Medication[],
    depleted: [] as Medication[],
  };

  for (const medicine of medicines) {
    if (medicine.quantity === MEDICINE_SUPPLY_DEPLETES_SOON_THRESHOLD) {
      resultingSupply.depletes_soon.push(medicine);
    } else if (medicine.quantity === MEDICINE_SUPPLY_LAST_ITEM) {
      resultingSupply.depleted.push(medicine);
    }

    resultingSupply.total += medicine.quantity;
  }

  return resultingSupply;
};
