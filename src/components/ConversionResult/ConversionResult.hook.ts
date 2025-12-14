import { useMemo } from "react";

import { dateMask } from "@/utils/dateMask";
import { normalizeCurrencyValue } from "@/utils/normalizeCurrencyValue";
import type { ConversionResultProps } from "./ConversionResult";

const useConversionResultHook = ({
  conversionRate,
  currencyAmount,
  datetime,
}: Omit<ConversionResultProps, "toCode" | "fromCode">) => {
  const totalConvertedValue = useMemo(() => {
    const normalizedAmount = normalizeCurrencyValue(currencyAmount);
    return (conversionRate * normalizedAmount).toFixed(2);
  }, [conversionRate, currencyAmount]);

  const formattedDate = useMemo(() => {
    return datetime
      ? dateMask(datetime).replaceAll("-", "/")
      : new Date().toLocaleDateString("en-US");
  }, [datetime]);

  return {
    totalConvertedValue,
    formattedDate,
  };
};

export default useConversionResultHook;
