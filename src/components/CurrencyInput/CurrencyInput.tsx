import React, { type ComponentProps } from "react";
import useCurrencyInputHook from "./CurrencyInput.hook";
import "./styles.scss";

export interface CurrencyInputProps extends Omit<
  ComponentProps<"input">,
  "onChange" | "type"
> {
  value?: string;
  onChange?(value: string, event: OnChangeEventType): void;
  label?: string;
  prefix?: string;
}

export type OnChangeEventType = React.ChangeEvent<HTMLInputElement>;

const CurrencyInput = (props: CurrencyInputProps) => {
  const { onChange, value: defaultValue, id, label, prefix, ...rest } = props;

  const { handleChange, value } = useCurrencyInputHook({
    onChange,
    value: defaultValue,
  });

  const valueMask = prefix ? `${prefix} ${value}` : value;

  return (
    <div className="currency-input" data-testid="currency-test-id">
      {label && <label htmlFor={id}>{label}</label>}
      <input
        data-testid="input-test-id"
        id={id}
        value={valueMask}
        onChange={(e) => handleChange(e.target.value, e)}
        {...rest}
      />
    </div>
  );
};

export default CurrencyInput;
