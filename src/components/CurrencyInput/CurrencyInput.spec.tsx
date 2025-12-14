import { fireEvent, render } from "@testing-library/react";
import CurrencyInput from "./CurrencyInput";

describe("CurrencyInput", () => {
  let rendered: ReturnType<typeof render>;
  afterEach(() => {
    rendered.unmount();
  });

  const TEST_ID = "currency-test-id";
  const INPUT_TEST_ID = "input-test-id";

  describe("instance", () => {
    it("Should render correctly", () => {
      // Arrange

      // Act
      rendered = render(<CurrencyInput />);

      // Assert
      const currencyInput = rendered.queryByTestId(TEST_ID);
      expect(currencyInput).toBeInTheDocument();
    });
  });

  describe("value", () => {
    it("Should start with empty value When no value is provided", () => {
      // Arrange

      // Act
      rendered = render(<CurrencyInput />);

      // Assert
      const datetimeInput = rendered.queryByTestId(INPUT_TEST_ID);
      expect(datetimeInput).toHaveValue("");
    });

    it("Should start input with date formatted When property `value` is properly provided", () => {
      // Arrange
      const value = "100000";

      // Act
      rendered = render(<CurrencyInput value={value} />);

      // Assert
      const datetimeInput = rendered.queryByTestId(INPUT_TEST_ID);
      expect(datetimeInput).toHaveValue("1,000.00");
    });
  });

  describe("onChange", () => {
    it("Should call onChangeFn function when user types on input", () => {
      // Arrange
      const onChangeFn = jest.fn();
      // Act
      rendered = render(<CurrencyInput onChange={onChangeFn} />);

      // Assert
      const datetimeInput = rendered.queryByTestId(INPUT_TEST_ID);
      if (!datetimeInput) throw new Error("Currency Input not found");

      fireEvent.change(datetimeInput, { target: { value: "100" } });

      expect(onChangeFn).toHaveBeenCalled();
    });
  });

  describe("prefix", () => {
    it("Should add prefix on value When provided", () => {
      // Arrange
      const prefix = "R$";
      const value = "100000";

      // Act
      rendered = render(<CurrencyInput prefix={prefix} value={value} />);

      // Assert
      const datetimeInput = rendered.queryByTestId(INPUT_TEST_ID);
      expect(datetimeInput).toHaveValue(`${prefix} 1,000.00`);
    });
  });

  describe("label", () => {
    it("Should not render label field When no label is provided", () => {
      // Arrange

      // Act
      rendered = render(<CurrencyInput />);

      // Assert
      const currencyInput = rendered.queryByTestId(TEST_ID);
      expect(currencyInput?.querySelector("label")).not.toBeInTheDocument();
    });

    it("Should render label When label is provided", () => {
      // Arrange
      const label = "I'm a label";
      // Act
      rendered = render(<CurrencyInput label={label} />);

      // Assert
      const currencyInput = rendered.queryByText(label);
      expect(currencyInput).toBeInTheDocument();
    });
  });
});
