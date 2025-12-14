import { fireEvent, render } from "@testing-library/react";
import DatetimeInput from "./DatetimeInput";

describe("DatetimeInput", () => {
  let rendered: ReturnType<typeof render>;
  afterEach(() => {
    rendered.unmount();
  });

  const TEST_ID = "datetime-input-test-id";
  const INPUT_TEST_ID = "input-test-id";
  const VALIDATIONS_TEST_ID = "validations-test-id";

  describe("instance", () => {
    it("Should render DatetimeInput When instanced with default properties", () => {
      // Arrange

      // Act
      rendered = render(<DatetimeInput onChange={jest.fn()} />);

      // Assert
      const datetimeInput = rendered.queryByTestId(TEST_ID);
      expect(datetimeInput).toBeInTheDocument();
    });
  });

  describe("value", () => {
    it("Should start with empty value When no value is provided", () => {
      // Arrange

      // Act
      rendered = render(<DatetimeInput onChange={jest.fn()} />);

      // Assert
      const datetimeInput = rendered.queryByTestId(INPUT_TEST_ID);
      expect(datetimeInput).toHaveValue("");
    });

    it("Should start input with date formatted When property `value` is properly provided", () => {
      // Arrange
      const value = "12312025";

      // Act
      rendered = render(<DatetimeInput onChange={jest.fn()} value={value} />);

      // Assert
      const datetimeInput = rendered.queryByTestId(INPUT_TEST_ID);
      expect(datetimeInput).toHaveValue("12-31-2025");
    });

    it("Should remove any non numeric characters When property `value` is provided with numbers and letters", () => {
      // Arrange
      const value = "test12312@ab025";

      // Act
      rendered = render(<DatetimeInput onChange={jest.fn()} value={value} />);

      // Assert
      const datetimeInput = rendered.queryByTestId(INPUT_TEST_ID);
      expect(datetimeInput).toHaveValue("12-31-2025");
    });

    it("Should remove extra length When property `value` is provided with more than 8 chars", () => {
      // Arrange
      const value = "1231202512312025";

      // Act
      rendered = render(<DatetimeInput onChange={jest.fn()} value={value} />);

      // Assert
      const datetimeInput = rendered.queryByTestId(INPUT_TEST_ID);
      expect(datetimeInput).toHaveValue("12-31-2025");
    });
  });

  describe("onChange", () => {
    it("Should call onChangeFn function when user types on input", () => {
      // Arrange
      const onChangeFn = jest.fn();
      // Act
      rendered = render(<DatetimeInput onChange={onChangeFn} />);

      // Assert
      const datetimeInput = rendered.queryByTestId(INPUT_TEST_ID);
      if (!datetimeInput) throw new Error("Datime Input not found");

      fireEvent.change(datetimeInput, { target: { value: "12122025" } });

      expect(onChangeFn).toHaveBeenCalled();
    });
  });

  describe("label", () => {
    it("Should not render label field When no label is provided", () => {
      // Arrange

      // Act
      rendered = render(<DatetimeInput onChange={jest.fn()} />);

      // Assert
      const datetimeInput = rendered.queryByTestId(TEST_ID);
      expect(datetimeInput?.querySelector("label")).not.toBeInTheDocument();
    });

    it("Should render label When label is provided", () => {
      // Arrange
      const label = "I'm a label";
      // Act
      rendered = render(<DatetimeInput onChange={jest.fn()} label={label} />);

      // Assert
      const datetimeInput = rendered.queryByText(label);
      expect(datetimeInput).toBeInTheDocument();
    });
  });

  describe("onThrowError", () => {
    it("Should call onThrowErrorFn with `true` param When users provided a future date on input", () => {
      // Arrange
      const futureDate = "12122027";
      const onThrowErrorFn = jest.fn();

      // Act
      rendered = render(
        <DatetimeInput
          onChange={jest.fn()}
          onThrowError={onThrowErrorFn}
          value={futureDate}
        />
      );

      // Assert
      const validationField = rendered.queryByTestId(VALIDATIONS_TEST_ID);
      expect(onThrowErrorFn).toHaveBeenCalledWith(true);
      expect(validationField).toBeInTheDocument();
    });

    it("Should call onThrowErrorFn with `true` param When users provided a wrong date format", () => {
      // Arrange
      const wrongDate = "33445555";
      const onThrowErrorFn = jest.fn();

      // Act
      rendered = render(
        <DatetimeInput
          onChange={jest.fn()}
          onThrowError={onThrowErrorFn}
          value={wrongDate}
        />
      );

      // Assert
      const validationField = rendered.queryByTestId(VALIDATIONS_TEST_ID);
      expect(onThrowErrorFn).toHaveBeenCalledWith(true);
      expect(validationField).toBeInTheDocument();
    });

    it("Should call onThrowErrorFn with `false` param When typed a correctly date format", () => {
      // Arrange
      const onChangeFn = jest.fn();
      const onThrowErrorFn = jest.fn();
      // Act
      rendered = render(
        <DatetimeInput onChange={onChangeFn} onThrowError={onThrowErrorFn} />
      );

      // Assert
      const datetimeInput = rendered.queryByTestId(INPUT_TEST_ID);
      const validationField = rendered.queryByTestId(VALIDATIONS_TEST_ID);
      if (!datetimeInput) throw new Error("Datime Input not found");

      fireEvent.change(datetimeInput, { target: { value: "12122025" } });

      expect(onThrowErrorFn).toHaveBeenCalledWith(false);
      expect(validationField).not.toBeInTheDocument();
    });
  });
});
