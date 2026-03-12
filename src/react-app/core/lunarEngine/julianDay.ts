// src/react-app/core/lunarEngine/julianDay.ts

/**
 * Converts a Gregorian date to a Julian Day Number.
 * This is the foundation for all astronomical lunar calculations.
 */
export const getJulianDayNumber = (day: number, month: number, year: number): number => {
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  
  const jd = day 
    + Math.floor((153 * m + 2) / 5) 
    + 365 * y 
    + Math.floor(y / 4) 
    - Math.floor(y / 100) 
    + Math.floor(y / 400) 
    - 32045;
    
  return jd;
};