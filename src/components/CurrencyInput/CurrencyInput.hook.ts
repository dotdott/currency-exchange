import { moneyMask } from "@/utils/moneyMask";
import { useCallback, useState } from "react";
import type { CurrencyInputProps, OnChangeEventType } from "./CurrencyInput";

const useCurrencyInputHook = ({
  onChange,
  value: defaultValue,
}: CurrencyInputProps) => {
  const [value, setValue] = useState<string>(
    defaultValue ? moneyMask(defaultValue) : ""
  );

  const handleChange = useCallback(
    (value: string, event: OnChangeEventType) => {
      setValue(moneyMask(value));
      onChange?.(moneyMask(value), event);
    },
    [onChange]
  );

  return { handleChange, value };
};

export default useCurrencyInputHook;
