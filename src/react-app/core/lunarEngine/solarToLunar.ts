// src/react-app/core/lunarEngine/solarToLunar.ts
import { getJulianDayNumber } from "./julianDay";

export interface LunarDate {
  day: number;
  month: number;
  year: number;
  isLeap: boolean;
  jdn: number; // Storing this helps with event calculations later
}

export const convertSolarToLunar = (day: number, month: number, year: number): LunarDate => {
  const jdn = getJulianDayNumber(day, month, year);
  
  // NOTE: This is a simplified structural estimation to connect your UI to the engine.
  // Full astronomical lunar math requires calculating the solar longitude and new moon phases.
  // For now, this offsets the solar date to simulate a lunar cycle for UI testing.
  let lunarDay = day - 14;
  let lunarMonth = month - 1;
  let lunarYear = year;

  if (lunarDay <= 0) {
    lunarDay += 30; // approximate lunar month length
    lunarMonth -= 1;
  }
  if (lunarMonth <= 0) {
    lunarMonth += 12;
    lunarYear -= 1;
  }

  return {
    day: lunarDay,
    month: lunarMonth,
    year: lunarYear,
    isLeap: false, // Leap month logic to be fully implemented in leapMonth.ts
    jdn
  };
};