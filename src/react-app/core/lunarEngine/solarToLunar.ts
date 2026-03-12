// src/react-app/core/lunarEngine/solarToLunar.ts
import { getJulianDayNumber, jdToDate } from "./julianDay";

export interface LunarDate {
  day: number;
  month: number;
  year: number;
  isLeap: boolean;
  jdn: number;
}

// Astronomical constants
const PI = Math.PI;

const getNewMoonDay = (k: number, timeZone: number): number => {
  const T = k / 1236.85;
  const T2 = T * T;
  const T3 = T2 * T;
  const dr = PI / 180;
  
  let Jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3;
  Jd1 = Jd1 + 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);
  
  const M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3;
  const Mprime = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3;
  const F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3;
  
  let C = (0.1734 - 0.000393 * T) * Math.sin(M * dr) + 0.0021 * Math.sin(2 * M * dr);
  C = C - 0.0004 * Math.sin(2 * F * dr) + 0.0005 * Math.sin((Mprime - M) * dr);
  
  const dJd = C + 0.0028 - 0.0004 * Math.cos(M * dr) + 0.0003 * Math.cos(2 * F * dr);
  
  return Math.floor(Jd1 + dJd + 0.5 + timeZone / 24);
};

const getSunLongitude = (dayNumber: number, timeZone: number): number => {
  const T = (dayNumber - 2451545.0 - timeZone / 24) / 36525.0;
  const dr = PI / 180;
  const M = 357.5291 + 35999.0503 * T - 0.0001559 * T * T - 0.00000048 * T * T * T;
  const L = 280.46646 + 36000.76983 * T + 0.0003032 * T * T;
  const C = (1.9146 - 0.004817 * T - 0.000014 * T * T) * Math.sin(M * dr) + (0.019993 - 0.000101 * T) * Math.sin(2 * M * dr) + 0.00029 * Math.sin(3 * M * dr);
  let lambda = L + C;
  lambda = lambda - 360 * Math.floor(lambda / 360);
  if (lambda < 0) lambda += 360;
  return Math.floor(lambda / 30) * 30; // Return solar term (0, 30, 60...)
};

const getLunarMonth11 = (yy: number, timeZone: number): number => {
  const off = yy - 1900;
  let k = Math.floor(off * 12.3685);
  let nm = getNewMoonDay(k, timeZone);
  const sunLong = getSunLongitude(nm, timeZone);
  if (sunLong >= 270) {
    k -= 1;
    nm = getNewMoonDay(k, timeZone);
  }
  return nm;
};

const getLeapMonthOffset = (a11: number, timeZone: number): number => {
  let k = Math.floor((a11 - 2415021.076998695) / 29.530588853) + 1;
  let last = 0;
  let i = 1;
  let arc = getSunLongitude(getNewMoonDay(k, timeZone), timeZone);
  
  while (i < 14) {
    const newArc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
    if (newArc === last) {
      return i;
    }
    last = newArc;
    i++;
  }
  return 0;
};

/**
 * Converts Solar Date to Vietnamese Lunar Date.
 * Timezone defaults to +7.
 */
export const convertSolarToLunar = (dd: number, mm: number, yy: number, timeZone: number = 7): LunarDate => {
  let dayNumber = getJulianDayNumber(dd, mm, yy);
  let k = Math.floor((dayNumber - 2415021.076998695) / 29.530588853);
  let monthStart = getNewMoonDay(k + 1, timeZone);
  
  if (monthStart > dayNumber) {
    monthStart = getNewMoonDay(k, timeZone);
  }
  
  const a11 = getLunarMonth11(yy, timeZone);
  let b11 = a11;
  if (a11 >= monthStart) {
    b11 = getLunarMonth11(yy - 1, timeZone);
  }
  
  let lunarMonth = Math.floor(0.5 + (monthStart - b11) / 29.530588853) + 11;
  if (lunarMonth > 12) lunarMonth -= 12;
  
  let lunarDay = dayNumber - monthStart + 1;
  let lunarYear = yy;
  if (mm < 3 && lunarMonth > 10) lunarYear -= 1;
  
  // Leap month calculation
  let leapMonthOffset = 0;
  let isLeap = false;
  const a11Next = getLunarMonth11(lunarYear + 1, timeZone);
  const diffDays = a11Next - b11;
  
  if (diffDays > 365) {
    leapMonthOffset = getLeapMonthOffset(b11, timeZone);
    const monthDiff = Math.floor(0.5 + (monthStart - b11) / 29.530588853);
    if (monthDiff === leapMonthOffset) {
      isLeap = true;
      lunarMonth -= 1;
    } else if (monthDiff > leapMonthOffset) {
      lunarMonth -= 1;
      if (lunarMonth === 0) lunarMonth = 12;
    }
  }
  
  return {
    day: lunarDay,
    month: lunarMonth,
    year: lunarYear,
    isLeap,
    jdn: dayNumber
  };
};