// Type definitions for @everapi/currencyapi-js 1.0.6
// Project: https://currencyapi.com
// Package: https://www.npmjs.com/package/@everapi/currencyapi-js
// Definitions by: ABBAL Sébastien <https://github.com/sebastien-abbal>

declare module "@everapi/currencyapi-js" {
  export default class {
    constructor(apiKey: string);

    /** Public function that returns the latest exchange rates. */
    public latest({
      base_currency,
      currencies,
    }: {
      /** The base currency to which all results are behaving relative to.
       *
       * By default all values are based on USD (ex: "USD") */
      base_currency?: string;
      /** A list of comma seperated currency codes which you want to get (EUR,USD,CAD).
       *
       * By default all available currencies will be shown (ex: "EUR,AED,ALL,AFN") */
      currencies?: string;
    }): Promise<{
      meta: {
        last_updated_at: string;
      };
      data: {
        [key: string]: {
          code: string;
          value: number;
        };
      };
    }>;

    /** Public function that returns your current quota. */
    public status(): Promise<{
      quotas: {
        month: {
          total: number;
          used: number;
          remaining: number;
        };
      };
    }>;

    /** Public function that returns all our supported currencies. */
    public currencies({
      currencies,
    }: {
      /** A list of comma seperated currency codes which you want to get (EUR,USD,CAD).
       *
       * By default all available currencies will be shown (ex: "EUR,AED,ALL,AFN") */
      currencies?: string;
    }): Promise<{
      data: {
        [key: string]: {
          symbol: string;
          name: string;
          symbol_native: string;
          decimal_digits: number;
          rounding: number;
          code: string;
          name_plural: string;
        };
      };
      errors?: string[][];
    }>;

    /** Public function that returns exchange rates for a given time range. Generally, we provide data going back to 1999. */
    public historical({
      date,
      base_currency,
      currencies,
    }: {
      /** Date to retrieve historical rates from (ex: "2021-12-31") */
      date: string;
      /** The base currency to which all results are behaving relative to.
       *
       * By default all values are based on USD (ex: "USD") */
      base_currency?: string;
      /** A list of comma seperated currency codes which you want to get (EUR,USD,CAD).
       *
       * By default all available currencies will be shown (ex: "EUR,AED,ALL,AFN") */
      currencies?: string;
    }): Promise<{
      meta: {
        last_updated_at: string;
      };
      data: {
        [key: string]: {
          code: string;
          value: number;
        };
      };
      errors?: string[][];
    }>;

    /** Public function that returns a range of exchange rates. Generally, we provide data going back to 1999. */
    public range({
      datetime_start,
      datetime_end,
      accuracy,
      base_currency,
      currencies,
    }: {
      /** Datetime for the start of your requested range ISO8601 Datetime
       *
       * (ex: 2021-12-31T23:59:59Z) */
      datetime_start: Date;
      /** Datetime for the end of your requested range ISO8601 Datetime
       *
       * (ex: 2021-12-31T23:59:59Z) */
      datetime_end: Date;
      /** The accuracy you want to receive (by default, it's "day")
       *
       * (ex: "minute") */
      accuracy?: "day" | "hour" | "quarter_hour" | "minute";
      /** The base currency to which all results are behaving relative to.
       *
       * By default all values are based on USD (ex: "USD") */
      base_currency?: string;
      /** A list of comma seperated currency codes which you want to get (EUR,USD,CAD).
       *
       * By default all available currencies will be shown (ex: "EUR,AED,ALL,AFN") */
      currencies?: string;
    }): Promise<{
      data: {
        datetime: string;
        currencies: {
          [key: string]: {
            code: string;
            value: number;
          };
        };
      }[];
    }>;

    /** Public function that returns calculated values for today or any given date for all currencies. */
    public convert({
      value,
      date,
      base_currency,
      currencies,
    }: {
      /** The value you want to convert */
      value: string;
      /** Date to retrieve historical rates from (ex: "2021-12-31") */
      date?: Date;
      /** The base currency to which all results are behaving relative to.
       *
       * By default all values are based on USD (ex: "USD") */
      base_currency?: string;
      /** A list of comma seperated currency codes which you want to get (EUR,USD,CAD).
       *
       * By default all available currencies will be shown (ex: "EUR,AED,ALL,AFN") */
      currencies?: string;
    }): Promise<{
      meta: {
        last_updated_at: string;
      };
      data: {
        [key: string]: {
          code: string;
          value: number;
        };
      };
    }>;
  }
}
