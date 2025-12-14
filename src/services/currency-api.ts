import { dateMask } from "@/utils/dateMask";
import currencyapi from "@everapi/currencyapi-js";

const KEY = import.meta.env.VITE_CURRENCY_API_KEY;

export const currencyClient = new currencyapi(KEY);

export const currencyHistorical = async (
  datetime: string,
  fromCode: string,
  toCode: string
) => {
  const today = new Date();
  const datetimeIsToday =
    new Date(dateMask(datetime + " 00:00")).toLocaleDateString("en-US") ===
    today.toLocaleDateString("en-US");
  const yesterday = datetime ? new Date(dateMask(datetime)) : new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const date = (
    datetime && !datetimeIsToday
      ? dateMask(datetime)
      : yesterday.toLocaleDateString("en-US").replaceAll("/", "-")
  )
    .split("-")
    .reverse();
  const dateFormat = `${date[0]}-${date[2]}-${date[1]}`;
  const currencies = await currencyClient.historical({
    base_currency: fromCode,
    date: dateFormat,
    currencies: toCode,
  });

  return currencies;
};
