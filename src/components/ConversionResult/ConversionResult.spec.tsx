import { render } from "@testing-library/react";
import ConversionResult from "./ConversionResult";

describe("ConversionResult", () => {
  let rendered: ReturnType<typeof render>;
  afterEach(() => {
    rendered.unmount();
  });

  describe("instance", () => {
    it("Should render correctly", () => {
      // Arrange

      // Act
      rendered = render(
        <ConversionResult
          conversionRate={0.54}
          datetime=""
          fromCode="BRL"
          toCode="USD"
          currencyAmount="10000"
        />
      );

      // Assert
      const conversionResult = rendered.queryByText("Cotation Date:");
      expect(conversionResult).toBeInTheDocument();
    });
  });
});
