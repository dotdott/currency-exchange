import type { CurrencyData } from "@/pages/ConversionPage/ConversionPage";
import { fireEvent, render } from "@testing-library/react";
import Autocomplete from "./Autocomplete";

describe("Autocomplete", () => {
  let rendered: ReturnType<typeof render>;
  afterEach(() => {
    rendered.unmount();
  });

  const TEST_ID = "autocomplete-test-id";
  const INPUT_TEST_ID = "input-test-id";
  const DROPDOWN_TEST_ID = "dropdown-test-id";
  const DROPDOWN_ITEMS_TEST_ID = "items-test-id";

  const data: CurrencyData[] = [
    {
      symbol: "R$",
      name: "Brazilian Real",
      symbol_native: "R$",
      decimal_digits: 2,
      rounding: 0,
      code: "BRL",
      name_plural: "Brazilian reals",
      type: "fiat",
      countries: ["BR"],
    },
    {
      symbol: "$",
      name: "US Dollar",
      symbol_native: "$",
      decimal_digits: 2,
      rounding: 0,
      code: "USD",
      name_plural: "US dollars",
      type: "fiat",
      countries: [],
    },
  ];

  describe("instance", () => {
    it("Should render Autocomplete", () => {
      // Arrange

      // Act
      rendered = render(<Autocomplete />);

      // Assert
      const autocomplete = rendered.queryByTestId(TEST_ID);
      expect(autocomplete).toBeInTheDocument();
    });
  });

  describe("data", () => {
    it("Should not show dropdown When provide data list", () => {
      // Arrange

      // Act
      rendered = render(<Autocomplete data={data} />);

      // Assert
      const dropdown = rendered.queryByTestId(DROPDOWN_TEST_ID);
      expect(dropdown).not.toBeInTheDocument();
    });

    it("Should show dropdown with data list When `data` is provided and input active focus", async () => {
      // Arrange

      // Act
      rendered = render(<Autocomplete data={data} />);

      // Assert
      const input = rendered.queryByTestId(INPUT_TEST_ID);
      if (!input) throw new Error("Autocomplete Input not found");

      fireEvent.focus(input);
      const dropdown = rendered.queryByTestId(DROPDOWN_TEST_ID)!;
      const items = await rendered.findAllByTestId(DROPDOWN_ITEMS_TEST_ID)!;

      expect(dropdown).toBeInTheDocument();
      expect(items).toHaveLength(2);
      expect(items[0].textContent.includes(data[0].code)).toBeTruthy();
      expect(items[1].textContent.includes(data[1].code)).toBeTruthy();
    });
  });

  describe("handleSelect", () => {
    it("Should call handleSelectFn function when dropdown item is clicked", async () => {
      // Arrange
      const handleSelectFn = jest.fn();
      // Act
      rendered = render(
        <Autocomplete data={data} handleSelect={handleSelectFn} />
      );

      // Assert
      const input = rendered.queryByTestId(INPUT_TEST_ID);
      if (!input) throw new Error("Autocomplete Input not found");

      fireEvent.focus(input);
      const items = await rendered.findAllByTestId(DROPDOWN_ITEMS_TEST_ID)!;

      fireEvent.click(items[0]);

      expect(handleSelectFn).toHaveBeenCalledWith(data[0].code);
    });

    it("Should close dropdown and update input value When dropdown item is clicked", async () => {
      // Arrange
      const inputValue = `${data[0].code} - ${data[0].name}`;

      // Act
      rendered = render(<Autocomplete data={data} />);

      // Assert
      const input = rendered.queryByTestId(INPUT_TEST_ID);
      if (!input) throw new Error("Autocomplete Input not found");

      fireEvent.focus(input);
      const dropdown = rendered.queryByTestId(DROPDOWN_TEST_ID)!;
      const items = await rendered.findAllByTestId(DROPDOWN_ITEMS_TEST_ID)!;

      fireEvent.click(items[0]);

      expect(dropdown).not.toBeInTheDocument();
      expect(input).toHaveValue(inputValue);
    });
  });

  describe("newCode", () => {
    it("Should set input value to matching code on data list When `newCode` and `data` properties are provided", async () => {
      // Arrange
      const inputValue = `${data[0].code} - ${data[0].name}`;

      // Act
      rendered = render(<Autocomplete data={data} newCode={data[0].code} />);

      // Assert
      const input = rendered.queryByTestId(INPUT_TEST_ID);
      if (!input) throw new Error("Autocomplete Input not found");

      fireEvent.focus(input);
      expect(input).toHaveValue(inputValue);
    });

    it("Should stay with empty input value When `newCode` property is provided but no `data` is settled", async () => {
      // Arrange
      const inputValue = "";

      // Act
      rendered = render(<Autocomplete newCode={data[0].code} />);

      // Assert
      const input = rendered.queryByTestId(INPUT_TEST_ID);
      if (!input) throw new Error("Autocomplete Input not found");

      fireEvent.focus(input);
      expect(input).toHaveValue(inputValue);
    });
  });
});
