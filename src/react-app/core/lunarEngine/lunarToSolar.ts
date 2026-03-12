// src/react-app/core/lunarEngine/lunarToSolar.ts
import { convertSolarToLunar } from "./solarToLunar";
import { getJulianDayNumber, jdToDate } from "./julianDay";

export const convertLunarToSolar = (
  lunarDay: number, 
  lunarMonth: number, 
  lunarYear: number, 
  isLeapMonth: boolean = false
) => {
  // 1. Create a rough baseline. 
  // A Lunar year is ~354 days, Solar is ~365. 
  // Treating a Lunar date as a Solar date puts us about ~20-50 days behind.
  // We add 30 days to center our guess.
  const guessJd = getJulianDayNumber(lunarDay, lunarMonth, lunarYear) + 30;
  
  // 2. Search a safe 100-day window (-50 to +50 days from our guess).
  for (let i = -50; i <= 50; i++) {
      const testDate = jdToDate(guessJd + i);
      const testLunar = convertSolarToLunar(testDate.day, testDate.month, testDate.year);
      
      // 3. If the converted solar date matches our target lunar date, we found the exact match!
      if (
          testLunar.day === lunarDay && 
          testLunar.month === lunarMonth && 
          testLunar.year === lunarYear && 
          testLunar.isLeap === isLeapMonth
      ) {
          return testDate; // Returns { day, month, year }
      }
  }
  
  // 4. Returns null if the user typed an invalid lunar date (e.g., Feb 30th)
  return null; 
};