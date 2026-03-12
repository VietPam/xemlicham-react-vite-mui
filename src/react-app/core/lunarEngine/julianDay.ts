// src/react-app/core/lunarEngine/julianDay.ts

export const getJulianDayNumber = (dd: number, mm: number, yy: number): number => {
  let a = Math.floor((14 - mm) / 12);
  let y = yy + 4800 - a;
  let m = mm + 12 * a - 3;
  return dd + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
};

export const jdToDate = (jd: number): { day: number; month: number; year: number } => {
  let l = jd + 68569;
  let n = Math.floor((4 * l) / 146097);
  l = l - Math.floor((146097 * n + 3) / 4);
  let i = Math.floor((4000 * (l + 1)) / 1461001);
  l = l - Math.floor((1461 * i) / 4) + 31;
  let j = Math.floor((80 * l) / 2447);
  let dd = l - Math.floor((2447 * j) / 80);
  l = Math.floor(j / 11);
  let mm = j + 2 - 12 * l;
  let yy = 100 * (n - 49) + i + l;
  return { day: dd, month: mm, year: yy };
};