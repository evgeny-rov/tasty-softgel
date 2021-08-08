export type Medication = {
  id: string;
  name: string;
  quantity: number;
};

export type MedicationsState = {
  allIds: string[];
  byId: {
    [id: string]: Medication;
  };
};

export type DailyMedication = {
  id: string;
  medicineId: string;
  hourId: number;
};

export type ScheduledMedications = {
  hourIdNow: number;
  confirmedDailyMedications: number[];
  lastConfirmationAt: number;
  daily_medications: DailyMedication[];
};

export type ModalMedicineState = {
  isVisible: boolean;
  data: Medication | null;
};
