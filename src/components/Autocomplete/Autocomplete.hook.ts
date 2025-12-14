import React, { useCallback, useEffect, useMemo, useState } from "react";
import type { AutocompleteProps } from "./Autocomplete";

const useAutocompleteHook = ({
  handleSelect,
  data,
  newCode,
}: AutocompleteProps) => {
  const [value, setValue] = useState("");
  const [code, setCode] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleChange = (value: string): void => {
    setValue(value);
    handleSelect?.("");

    if (!showDropdown) {
      setShowDropdown(true);
    }
  };

  const handleOptionSelect = (value: string, code: string): void => {
    setValue(value);
    setCode(code);
    setShowDropdown(false);

    handleSelect?.(code);
  };

  const handleCleanSelectedOption = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (code && event.code === "Backspace") {
      setCode("");
      setValue("");
      setShowDropdown(true);

      handleSelect?.("");
    }
  };

  const handleBlur = useCallback(() => {
    setTimeout(() => {
      setShowDropdown(false);
    }, 150);
  }, []);

  const handleFocus = useCallback(() => {
    if (!showDropdown && !code) {
      setShowDropdown(true);
    }
  }, [showDropdown, code]);

  const dropdownList = useMemo(() => {
    if (!value || !value.length) return data || [];

    const itemList = data?.filter(({ code, symbol, name, name_plural }) => {
      const properties: string = JSON.stringify({
        code,
        symbol,
        name,
        name_plural,
      }).toLowerCase();

      return properties.includes(value.toLowerCase().replace("-", ""));
    });

    return itemList || [];
  }, [value, data]);

  useEffect(() => {
    if (newCode !== code && newCode && data?.length) {
      const updateCode = () => {
        if (newCode) {
          const item = data.filter((d) => d.code === newCode)[0];

          setCode(newCode);
          setValue(`${item.code} - ${item.name}`);
        }
      };
      updateCode();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newCode]);

  return {
    handleChange,
    handleOptionSelect,
    handleCleanSelectedOption,
    handleBlur,
    handleFocus,
    value,
    dropdownList,
    showDropdown,
  };
};

export default useAutocompleteHook;
