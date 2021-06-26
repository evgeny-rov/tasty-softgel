import {Medicine} from 'src/types';

const MEDICINE_SUPPLY_DEPLETES_SOON_THRESHOLD = 6;
const MEDICINE_SUPPLY_LAST_ITEM = 1;

export default (medicines: Medicine[]) => {
  const resultingSupply = {
    total: 0,
    depletes_soon: [] as Medicine[],
    depleted: [] as Medicine[],
  };

  for (const medicine of medicines) {
    if (medicine.count === MEDICINE_SUPPLY_DEPLETES_SOON_THRESHOLD) {
      resultingSupply.depletes_soon.push(medicine);
    } else if (medicine.count === MEDICINE_SUPPLY_LAST_ITEM) {
      resultingSupply.depleted.push(medicine);
    }

    resultingSupply.total += medicine.count;
  }

  return resultingSupply;
};
