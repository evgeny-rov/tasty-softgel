export type Medication = {
  id: string;
  name: string;
  quantity: number;
};

export type MedicationsState = {
  allIds: string[];
  byId: Record<string, Medication>
};

export type DailyMedication = {
  id: string;
  medicationId: string;
  hourId: number;
};

export type ScheduledMedicationsState = {
  hourIdNow: number;
  confirmedHourIds: number[];
  lastConfirmationAt: number;
  daily_medications: Record<string, DailyMedication>;
};

export type MedicationModalState = {
  isVisible: boolean;
  data: Medication | null;
};
