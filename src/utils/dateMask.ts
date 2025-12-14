export const dateMask = (value: string): string => {
  const date = value.replace(/\D/g, "").slice(0, 8).split("");

  if (value.length > 2) {
    date[1] = date[1] + "-";
  }

  if (value.length > 4) {
    date[3] = date[3] + "-";
  }
  return date.join("");
};
