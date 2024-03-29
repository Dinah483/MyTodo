
import { v4 as uuidv4 } from 'uuid';

// sort by alphabetical order
export const sortAlphabetically = (a: string, b: string) => {
  return a.localeCompare(b);
};

export const dateFormat_YY_MM_DY = (dateMillis: number | string | null) => {
  // if (dateMillis === null) return Date.now(); //"-" removed

  if (dateMillis === null) return "-";

  const date = new Date(dateMillis);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();

  // append 0 if month or day is less than 10
  const mn = `${month < 10 ? `0${month}` : month}`;
  const dy = `${day < 10 ? `0${day}` : day}`;

  return `${year}-${mn}-${dy}`;
};

export const dateFormat = (dateMillis: number | string | null) => {
  if (dateMillis === null || dateMillis === 0 || dateMillis === undefined) {
    return "-";
  } else {
    // year numeric, month numeric, day numeric
    const date = new Date(dateMillis);

    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
      day: "numeric",
    });
  }
};



export const generateUID = () => {
  const uuid = uuidv4();
  const simple = uuid.substring(0, 6);
  return simple;
};