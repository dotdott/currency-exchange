const userLanguage = navigator?.language ?? "pt-BR";

export const moneyMask = (value: string): string => {
  // parseFloat in case currency starts with a value that has more than 2 decimals
  const floatValue = Number(parseFloat(value.replace(/\D/g, "")).toFixed(2));

  const result = new Intl.NumberFormat(userLanguage, {
    minimumFractionDigits: 2,
  }).format(floatValue / 100);

  return result !== "NaN" ? result : "0.00";
};
