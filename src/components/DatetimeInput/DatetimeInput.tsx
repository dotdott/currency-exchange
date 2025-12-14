import React, { type ComponentProps } from "react";
import useDatetimeInputHook from "./DatetimeInput.hook";
import "./styles.scss";

export interface DatetimeInputProps extends Omit<
  ComponentProps<"input">,
  "onChange"
> {
  value?: string;
  onChange(value: string, event: OnChangeEventType): void;
  onThrowError?(hasError: boolean): void;
  label?: string;
}

export type OnChangeEventType = React.ChangeEvent<HTMLInputElement>;

const DatetimeInput = (props: DatetimeInputProps) => {
  const {
    onChange,
    onThrowError,
    value: defaultValue,
    id,
    label,
    ...rest
  } = props;

  const { handleChange, dateMask, validationMessage, value } =
    useDatetimeInputHook({
      onChange,
      onThrowError,
      value: defaultValue,
    });

  return (
    <div className="datetime-input" data-testid="datetime-input-test-id">
      {label && <label htmlFor={id}>{label}</label>}
      <input
        data-testid="input-test-id"
        id={id}
        value={dateMask(value)}
        placeholder="(MM-DD-AAAA)"
        onChange={(e) => handleChange(e.target.value, e)}
        {...rest}
      />
      {!!validationMessage && (
        <span
          className="datetime-input__error-message"
          data-testid="validations-test-id"
        >
          {validationMessage}
        </span>
      )}
    </div>
  );
};

export default DatetimeInput;
