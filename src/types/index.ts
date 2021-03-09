export type Medicine = {
  id: string;
  name: string;
  initialAmount: number;
  currentAmount: number;
  intakeHours: number[];
};

export type AppState = {
  allIds: string[];
  byId: {
    [id: string]: Medicine;
  };
  selectedRemindersHour: number;
};
