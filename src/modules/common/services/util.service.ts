import { endOfDay, format, startOfDay } from 'date-fns';
// import { useTranslation } from 'react-i18next';

// export function getRelativeDate(createAt: string) {
//   const { t } = useTranslation();
//   const now = new Date();
//   const utcTimeOffset = now.getTimezoneOffset() / 60;

//   let creationDate = parseISO(createAt);
//   creationDate.setHours(creationDate.getHours() - utcTimeOffset);

//   if (isToday(creationDate)) {
//     return format(creationDate, 'HH:mm');
//   } else if (isYesterday(creationDate)) {
//     return t('yesterday_label');
//   } else {
//     return format(creationDate, 'dd-MM-yyyy');
//   }
// }

export function makeId(length = 5) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export function makeNumberId(length = 5) {
  const multiplier = 9 * Math.pow(10, length - 1);
  return Math.trunc(Math.random() * multiplier);
}

export function isPrimitive(value: any): boolean {
  return typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean';
}

export const formatClockTime = (time: string) => {
  const [hour, minute] = time.split(':');
  return `${hour}:${minute}`;
};

export const isIsraeliIdValid = (id: string) => {
  let strId = String(id).trim();
  if (strId.length > 9) {
    return false;
  }
  if (strId.length < 9) {
    strId = strId.padStart(9, '0');
  }

  let sum = 0;
  let rawVal: number;

  for (let i = 0; i < strId.length; i++) {
    rawVal = Number(strId[i]) * ((i % 2) + 1);
    sum += rawVal > 9 ? rawVal - 9 : rawVal;
  }
  return sum % 10 === 0;
};

export function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export const isRtl = (text: string): boolean => {
  const rtlChar = /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/;
  return rtlChar.test(text);
};

export function formatTime(date: string | Date | null, formatStr = 'HH:mm') {
  if (!date) return '';
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  return format(date, formatStr);
}

export function isValidDate(dateString: string): boolean {
  const isoPattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

  return isoPattern.test(dateString);
}

export function formatDate(date: string | Date | null, formatStr = 'dd.MM.yyyy') {
  if (!date) return '';
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  return format(date, formatStr);
}

export const getDefaultStartAndEndOfDay = () => {
  const startTime = format(startOfDay(new Date()), 'HH:mm:ss');
  const endTime = format(new Date(endOfDay(new Date()).setSeconds(0, 0)), 'HH:mm:ss');

  return { startTime, endTime };
};

type KeyType = string | number;

export function arrayToObject<T extends Record<KeyType, any>>(array: T[], key: keyof T): Record<KeyType, T> {
  return array.reduce((acc, item) => {
      const keyValue = item[key] as KeyType;
      acc[keyValue] = item;
      return acc;
  }, {} as Record<KeyType, T>);
}

export function isNumber(value: any): boolean {
  return typeof value === 'number';
}

const convertTimeStringToDate = (time?: string) => {
  const date = new Date();
  if (!time) return date.setHours(0, 0);

  // Extract hours, minutes, and seconds from the time string
  const [hours, minutes] = time.split(':').map(Number);
  date.setHours(hours, minutes);
  return date;
};


export const utilService = {
  makeId,
  isPrimitive,
  formatClockTime,
  convertTimeStringToDate,
  isIsraeliIdValid,
  isRtl,
  formatTime,
  formatDate,
  isValidDate,
  arrayToObject,
  isNumber
};
