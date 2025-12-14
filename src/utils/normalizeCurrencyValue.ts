export const normalizeCurrencyValue = (formattedValue: string): number => {
  return Number(formattedValue.replaceAll(".", "").replace(",", "."));
};
