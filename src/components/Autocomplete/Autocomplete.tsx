import type { CurrencyData } from "@/pages/ConversionPage/ConversionPage";
import useAutocompleteHook from "./Autocomplete.hook";
import "./styles.scss";

export interface AutocompleteProps {
  handleSelect?(option: string): void;
  newCode?: string | null;
  data?: CurrencyData[];
}

const Autocomplete = ({ handleSelect, newCode, data }: AutocompleteProps) => {
  const {
    dropdownList,
    showDropdown,
    value,
    handleChange,
    handleCleanSelectedOption,
    handleOptionSelect,
    handleBlur,
    handleFocus,
  } = useAutocompleteHook({
    handleSelect,
    data,
    newCode,
  });

  return (
    <div className="autocomplete" data-testid="autocomplete-test-id">
      <input
        value={value}
        data-testid="input-test-id"
        onBlur={handleBlur}
        onFocus={handleFocus}
        onKeyDown={handleCleanSelectedOption}
        onChange={(e) => handleChange(e.target.value)}
      />

      {showDropdown && (
        <div
          className="autocomplete__dropdown-items"
          data-testid="dropdown-test-id"
        >
          {dropdownList.length > 0 ? (
            dropdownList.map((il) => (
              <span
                key={il.code}
                data-testid="items-test-id"
                onClick={() =>
                  handleOptionSelect(`${il.code} - ${il.name}`, il.code)
                }
              >
                {il.code} - {il.name}
              </span>
            ))
          ) : (
            <span>No currency found</span>
          )}
        </div>
      )}
    </div>
  );
};

export default Autocomplete;
