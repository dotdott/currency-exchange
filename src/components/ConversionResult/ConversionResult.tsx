import "./styles.scss";

import { moneyMask } from "@/utils/moneyMask";
import useConversionResultHook from "./ConversionResult.hook";

export interface ConversionResultProps {
  datetime: string;
  fromCode: string;
  toCode: string;
  currencyAmount: string;
  conversionRate: number;
}

const ConversionResult = ({
  datetime,
  fromCode,
  toCode,
  currencyAmount,
  conversionRate,
}: ConversionResultProps) => {
  const { formattedDate, totalConvertedValue } = useConversionResultHook({
    datetime,
    currencyAmount,
    conversionRate,
  });

  return (
    <div className="result">
      <span className="date">
        <b>Cotation Date:</b> {formattedDate}
      </span>

      <span className="exchange">
        <b>Convertion: </b>
        <span className="exchange-formula">
          1 {fromCode} = {conversionRate} {toCode}
        </span>
        <span className="exchange-result">
          {currencyAmount} {fromCode} ={" "}
          <b>
            {moneyMask(totalConvertedValue)} {toCode}
          </b>
        </span>
      </span>
    </div>
  );
};

export default ConversionResult;
