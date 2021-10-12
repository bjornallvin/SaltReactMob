export const removeUndefinedKeys = <T>(obj: T): T => {
  const newObj = { ...obj };
  for (const key of Object.keys(newObj)) {
    newObj[key as keyof T] === undefined && delete newObj[key as keyof T];
  }
  return newObj;
};
export const findUndefinedKeys = <T>(obj: T): T => {
  const newObj = { ...obj };
  for (const key of Object.keys(newObj)) {
    if (typeof newObj[key as keyof T] === 'object') {
      findUndefinedKeys(newObj[key as keyof T]);
    }
    newObj[key as keyof T] === undefined &&
      console.log((key as keyof T) + ':' + newObj[key as keyof T]);
  }
  return newObj;
};
