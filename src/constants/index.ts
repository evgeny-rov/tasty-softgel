import hourToTimeString from "src/utils/hourToTimeString";

export const HOURS_IN_A_DAY = Array.from(Array(24).keys());

export const HOURS_AS_TIME_STRING = HOURS_IN_A_DAY.map(hourToTimeString);