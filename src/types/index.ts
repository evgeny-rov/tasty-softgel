export type Medicine = {
  id: string;
  name: string;
  initialAmount: number;
  currentAmount: number;
  hours: number[];
};

export type AppState = {
  allIds: string[];
  byId: {
    [id: string]: Medicine;
  }
  pickerSelectedValue: number;
};
