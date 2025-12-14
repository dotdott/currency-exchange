import { useCallback, useEffect, useMemo, useState } from "react";
import "./styles.scss";

import exchangeIcon from "@/assets/arrows-left-right.svg";

import Autocomplete from "@/components/Autocomplete";
import CurrencyInput from "@/components/CurrencyInput";
import DatetimeInput from "@/components/DatetimeInput";
import ErrorMessage from "@/components/ErrorMessage";

import ConversionResult from "@/components/ConversionResult";
import { currencyClient, currencyHistorical } from "@/services/currency-api";

export type CurrencyData = {
  symbol: string;
  name: string;
  symbol_native: string;
  decimal_digits: number;
  rounding: number;
  code: string;
  name_plural: string;
  type: string;
  countries: string[];
};

const ConversionPage = () => {
  const [currencyAmount, setCurrencyAmount] = useState("");
  const [conversionRate, setConversionRate] = useState<number | null>(null);
  const [datetime, setDatetime] = useState("");
  const [datetimeError, setDatetimeError] = useState(false);
  const [fromCode, setFromCode] = useState<string | null>(null);
  const [toCode, setToCode] = useState<string | null>(null);
  const [currencyList, setCurrencyList] = useState<CurrencyData[]>([]);
  const [errors, setErrors] = useState<string[][]>([]);

  const fromSymbolPrefix = useMemo(() => {
    const currency = currencyList.find((d) => d.code === fromCode);
    return currency?.symbol ?? "";
  }, [fromCode, currencyList]);

  const isSwipeDisabled = useMemo(
    () => !fromCode || !toCode,
    [fromCode, toCode]
  );
  const isSubmitDisabled = useMemo(
    () => !currencyAmount || isSwipeDisabled || datetimeError,
    [currencyAmount, isSwipeDisabled, datetimeError]
  );

  const handleCurrencyAmountChange = useCallback((value: string): void => {
    setCurrencyAmount(value);
  }, []);

  const handleDatetimeError = useCallback((hasError: boolean) => {
    setDatetimeError(hasError);
  }, []);

  const handleDatetimeChange = useCallback((value: string): void => {
    setDatetime(value);
    setConversionRate(null);
  }, []);

  const handleSelectFrom = useCallback((code: string) => {
    setFromCode(code);
  }, []);

  const handleSelectTo = useCallback((code: string) => {
    setToCode(code);
  }, []);

  const handleSwapCurrencies = useCallback(() => {
    if (fromCode && toCode) {
      setFromCode(toCode);
      setToCode(fromCode);
      setConversionRate(null);
    }
  }, [fromCode, toCode]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!currencyAmount || !fromCode || !toCode) {
      return;
    }

    const currencies = await currencyHistorical(datetime, fromCode, toCode);

    if (currencies.errors) {
      setErrors(Object.values(currencies.errors));
      setConversionRate(null);
    } else {
      setConversionRate(currencies.data[toCode].value);
      setErrors([]);
    }
  };

  useEffect(() => {
    const fetchCurrencyList = async () => {
      const response = await currencyClient.currencies({});

      if (response.errors) {
        setErrors(Object.values(response.errors));
      } else {
        setCurrencyList(Object.values(response.data) as CurrencyData[]);
        setErrors([]);
      }
    };

    fetchCurrencyList();
  }, []);

  return (
    <main className="conversion-container">
      <div className="wrapper">
        <h1>Currency Exchange</h1>
        <h2>Money converter</h2>

        <form className="currency-form" onSubmit={handleSubmit}>
          <CurrencyInput
            id="from"
            label="FROM"
            prefix={fromSymbolPrefix}
            value={currencyAmount}
            onChange={handleCurrencyAmountChange}
          />

          <div className="convertors">
            <div className="convertors__wrapper">
              <Autocomplete
                newCode={fromCode}
                data={currencyList}
                handleSelect={handleSelectFrom}
              />
            </div>

            <button
              className={
                isSwipeDisabled
                  ? "disabled exchange-currency"
                  : "exchange-currency"
              }
              onClick={handleSwapCurrencies}
              disabled={isSwipeDisabled}
              type="button"
            >
              <img src={exchangeIcon} alt="Swipe Currencies" />
            </button>

            <div className="convertors__wrapper">
              <label>TO</label>
              <Autocomplete
                data={currencyList}
                newCode={toCode}
                handleSelect={handleSelectTo}
              />
            </div>
          </div>

          <div className="date-input">
            <DatetimeInput
              label={"Date of Conversion (optional)"}
              onChange={handleDatetimeChange}
              onThrowError={handleDatetimeError}
            />
          </div>

          <button
            disabled={isSubmitDisabled}
            className={isSubmitDisabled ? "disabled submit-btn" : "submit-btn"}
            type="submit"
          >
            CALCULATE CONVERSION
          </button>
        </form>

        {conversionRate && fromCode && toCode && (
          <ConversionResult
            datetime={datetime}
            fromCode={fromCode}
            toCode={toCode}
            currencyAmount={currencyAmount}
            conversionRate={conversionRate}
          />
        )}

        {errors.length > 0 && <ErrorMessage errors={errors} />}
      </div>
    </main>
  );
};

export default ConversionPage;
