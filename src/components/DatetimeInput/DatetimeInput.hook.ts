import { useCallback, useMemo, useState } from "react";
import type { DatetimeInputProps, OnChangeEventType } from "./DatetimeInput";
import { dateMask } from "@/utils/dateMask";

const useDatetimeInputHook = ({
  onChange,
  onThrowError,
  value: defaultValue,
}: DatetimeInputProps) => {
  const [value, setValue] = useState<string>(defaultValue ?? "");
  const LOCALE = useMemo(() => "en-US", []);

  const handleChange = useCallback(
    (value: string, event: OnChangeEventType) => {
      setValue(value.replace(/\D/g, ""));
      onChange(value.replace(/\D/g, ""), event);
      onThrowError?.(false);
    },
    [onChange, onThrowError]
  );

  const validationMessage = useMemo(() => {
    if (value.length > 7) {
      const date = Date.parse(
        new Date(dateMask(value)).toLocaleDateString(LOCALE)
      );
      const today = Date.parse(new Date().toLocaleDateString(LOCALE));
      if (isNaN(date)) {
        onThrowError?.(true);
        return "Insert a valid date on format (MM-DD-AAAA)";
      }

      if (date > today) {
        onThrowError?.(true);
        return "Date can't be on future.";
      }
    }
    return "";
  }, [value, LOCALE, onThrowError]);

  return { handleChange, dateMask, validationMessage, value };
};

export default useDatetimeInputHook;
