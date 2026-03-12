// src/react-app/core/lunarEngine/lunarToSolar.ts
import { convertSolarToLunar } from "./solarToLunar";
import { getJulianDayNumber, jdToDate } from "./julianDay";

export const convertLunarToSolar = (
  lunarDay: number, 
  lunarMonth: number, 
  lunarYear: number, 
  isLeapMonth: boolean = false
) => {
  // Rough guess: the solar date is usually 1 to 2 months ahead of the lunar date
  const guessJd = getJulianDayNumber(lunarDay, lunarMonth, lunarYear) + 30;
  
  // Search a 60-day window around our guess to find the exact match
  for (let i = -30; i < 60; i++) {
     const testDate = jdToDate(guessJd + i);
     const testLunar = convertSolarToLunar(testDate.day, testDate.month, testDate.year);
     
     if (
         testLunar.day === lunarDay && 
         testLunar.month === lunarMonth && 
         testLunar.year === lunarYear && 
         testLunar.isLeap === isLeapMonth
     ) {
         return testDate; // Returns { day, month, year }
     }
  }
  return null; 
};