export const getKeyByValue = (object: { [key: string]: number }, value: number) =>
  Object.keys(object).find((key) => object[key] === value);
